import pandas as pd
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import UploadHistory
from .serializers import UploadHistorySerializer


# ============================
#   1) CSV Upload API
# ============================
@api_view(['POST'])
def upload_csv(request):
    file = request.FILES.get('file')

    if not file:
        return Response({"error": "No file uploaded"}, status=400)

    # Read CSV using pandas
    df = pd.read_csv(file)

    # Generate summary
    summary = {
    "total_count": len(df),
    "avg_flowrate": float(df["Flowrate"].mean()),
    "avg_pressure": float(df["Pressure"].mean()),
    "avg_temperature": float(df["Temperature"].mean()),
    "type_distribution": df["Type"].value_counts().to_dict(),
    "flowrate_list": df["Flowrate"].tolist(),
}

    # Save history in DB
    UploadHistory.objects.create(
        file_name=file.name,
        summary_json=summary
    )

    # Keep only last 5 records
    history = UploadHistory.objects.all().order_by('upload_time')
    if history.count() > 5:
        history.first().delete()

    return Response(summary)


# ============================
#   2) History API
# ============================
@api_view(['GET'])
def history(request):
    items = UploadHistory.objects.order_by('-upload_time')
    serializer = UploadHistorySerializer(items, many=True)
    return Response(serializer.data)


from reportlab.pdfgen import canvas
from django.http import FileResponse
import io


@api_view(['GET'])
def generate_report(request):
    # Fetch latest history entry
    last_entry = UploadHistory.objects.order_by('-upload_time').first()

    if not last_entry:
        return Response({"error": "No data available to generate report"}, status=400)

    summary = last_entry.summary_json

    # Create PDF in memory
    buffer = io.BytesIO()
    pdf = canvas.Canvas(buffer)

    pdf.setFont("Helvetica-Bold", 16)
    pdf.drawString(200, 800, "Chemical Equipment Report")

    pdf.setFont("Helvetica", 12)
    pdf.drawString(50, 760, f"Total Equipment Count: {summary['total_count']}")
    pdf.drawString(50, 740, f"Average Flowrate: {summary['avg_flowrate']}")
    pdf.drawString(50, 720, f"Average Pressure: {summary['avg_pressure']}")
    pdf.drawString(50, 700, f"Average Temperature: {summary['avg_temperature']}")

    pdf.drawString(50, 670, "Equipment Type Distribution:")

    y = 650
    for eq_type, count in summary["type_distribution"].items():
        pdf.drawString(70, y, f"{eq_type}: {count}")
        y -= 20

    pdf.showPage()
    pdf.save()

    buffer.seek(0)
    return FileResponse(buffer, as_attachment=True, filename="equipment_report.pdf")