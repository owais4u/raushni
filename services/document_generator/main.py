from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
import asyncio
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter, A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_CENTER, TA_LEFT
import qrcode
from io import BytesIO
import base64
from datetime import datetime
import json
import boto3
from botocore.exceptions import ClientError

app = FastAPI()

class MemberCardRequest(BaseModel):
    memberId: str
    name: str
    designation: str
    joinDate: str
    qrData: str

class DonationReceiptRequest(BaseModel):
    receiptNo: str
    donorName: str
    amount: float
    date: str
    purpose: str
    transactionId: str

class AppointmentLetterRequest(BaseModel):
    name: str
    designation: str
    startDate: str
    salary: float
    memberId: str

class CertificateRequest(BaseModel):
    name: str
    achievement: str
    date: str
    certificateId: str

@app.post("/generate/member-card")
async def generate_member_card(request: MemberCardRequest):
    try:
        buffer = BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=letter)
        styles = getSampleStyleSheet()
        story = []

        # Title
        title_style = ParagraphStyle(
            'CustomTitle',
            parent=styles['Heading1'],
            fontSize=24,
            textColor=colors.HexColor('#FF6B00'),
            alignment=TA_CENTER,
            spaceAfter=30
        )
        story.append(Paragraph("RAUSHNI EDUCATIONAL & SOCIAL WELFARE TRUST", title_style))

        # Member ID Card Content
        data = [
            ['Member ID:', request.memberId],
            ['Name:', request.name],
            ['Designation:', request.designation],
            ['Join Date:', request.joinDate],
        ]

        table = Table(data, colWidths=[2*inch, 4*inch])
        table.setStyle(TableStyle([
            ('FONTNAME', (0, 0), (-1, -1), 'Helvetica'),
            ('FONTSIZE', (0, 0), (-1, -1), 12),
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
            ('BACKGROUND', (0, 0), (0, -1), colors.lightgrey),
        ]))
        story.append(table)
        story.append(Spacer(1, 20))

        # Generate QR Code
        qr = qrcode.QRCode(box_size=10, border=4)
        qr.add_data(request.qrData)
        qr.make(fit=True)
        qr_image = qr.make_image(fill_color="black", back_color="white")

        qr_buffer = BytesIO()
        qr_image.save(qr_buffer, 'PNG')
        qr_buffer.seek(0)

        story.append(Image(qr_buffer, width=2*inch, height=2*inch))

        doc.build(story)
        buffer.seek(0)

        # Upload to S3 or return base64
        pdf_base64 = base64.b64encode(buffer.getvalue()).decode()

        return {"status": "success", "pdf": pdf_base64}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/generate/donation-receipt")
async def generate_donation_receipt(request: DonationReceiptRequest):
    try:
        buffer = BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=A4)
        styles = getSampleStyleSheet()
        story = []

        # Header
        header_style = ParagraphStyle(
            'Header',
            parent=styles['Heading1'],
            fontSize=18,
            textColor=colors.HexColor('#0066CC'),
            alignment=TA_CENTER
        )
        story.append(Paragraph("80G Donation Receipt", header_style))
        story.append(Spacer(1, 20))

        # Receipt Details
        receipt_data = [
            ['Receipt No:', request.receiptNo],
            ['Donor Name:', request.donorName],
            ['Amount:', f"₹{request.amount:,.2f}"],
            ['Date:', request.date],
            ['Purpose:', request.purpose],
            ['Transaction ID:', request.transactionId],
        ]

        table = Table(receipt_data, colWidths=[2*inch, 4*inch])
        table.setStyle(TableStyle([
            ('FONTNAME', (0, 0), (-1, -1), 'Helvetica'),
            ('FONTSIZE', (0, 0), (-1, -1), 11),
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
            ('BACKGROUND', (0, 0), (0, -1), colors.lightgrey),
        ]))
        story.append(table)
        story.append(Spacer(1, 30))

        # 80G Certificate Text
        cert_style = ParagraphStyle(
            'Certificate',
            parent=styles['Normal'],
            fontSize=10,
            alignment=TA_LEFT
        )
        cert_text = """
        This is to certify that the above donation has been received by RAUSHNI EDUCATIONAL & 
        SOCIAL WELFARE TRUST and is eligible for deduction under Section 80G of the Income Tax Act, 1961.
        """
        story.append(Paragraph(cert_text, cert_style))

        doc.build(story)
        buffer.seek(0)

        pdf_base64 = base64.b64encode(buffer.getvalue()).decode()
        return {"status": "success", "pdf": pdf_base64}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/generate/appointment-letter")
async def generate_appointment_letter(request: AppointmentLetterRequest):
    try:
        buffer = BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=A4)
        styles = getSampleStyleSheet()
        story = []

        # Letterhead
        letterhead_style = ParagraphStyle(
            'Letterhead',
            parent=styles['Heading1'],
            fontSize=16,
            textColor=colors.HexColor('#FF6B00'),
            alignment=TA_CENTER
        )
        story.append(Paragraph("RAUSHNI EDUCATIONAL & SOCIAL WELFARE TRUST", letterhead_style))
        story.append(Spacer(1, 10))
        story.append(Paragraph("Appointment Letter", styles['Heading2']))
        story.append(Spacer(1, 30))

        # Date
        story.append(Paragraph(f"Date: {datetime.now().strftime('%B %d, %Y')}", styles['Normal']))
        story.append(Spacer(1, 20))

        # Subject
        story.append(Paragraph(f"Subject: Appointment as {request.designation}", styles['Normal']))
        story.append(Spacer(1, 20))

        # Body
        body_text = f"""
        Dear {request.name},
        
        We are pleased to appoint you as {request.designation} at RAUSHNI EDUCATIONAL & SOCIAL WELFARE TRUST.
        
        Your appointment details are as follows:
        - Start Date: {request.startDate}
        - Member ID: {request.memberId}
        - Annual Salary: ₹{request.salary:,.2f}
        
        Please report to the HR department on your start date for onboarding formalities.
        
        We look forward to having you on our team and wish you a successful career with us.
        
        Sincerely,
        Management
        RAUSHNI EDUCATIONAL & SOCIAL WELFARE TRUST
        """

        body_style = ParagraphStyle(
            'Body',
            parent=styles['Normal'],
            fontSize=11,
            leading=14
        )
        story.append(Paragraph(body_text.replace('\n', '<br/>'), body_style))

        doc.build(story)
        buffer.seek(0)

        pdf_base64 = base64.b64encode(buffer.getvalue()).decode()
        return {"status": "success", "pdf": pdf_base64}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/generate/certificate")
async def generate_certificate(request: CertificateRequest):
    try:
        buffer = BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=landscape(letter))
        styles = getSampleStyleSheet()
        story = []

        # Certificate Border
        border_style = ParagraphStyle(
            'Border',
            parent=styles['Normal'],
            fontSize=30,
            textColor=colors.HexColor('#FFD700'),
            alignment=TA_CENTER
        )

        story.append(Spacer(1, 50))
        story.append(Paragraph("CERTIFICATE OF ACHIEVEMENT", styles['Heading1']))
        story.append(Spacer(1, 30))

        cert_text = f"""
        This certificate is proudly presented to
        
        {request.name}
        
        For outstanding achievement in
        
        {request.achievement}
        
        Date: {request.date}
        Certificate ID: {request.certificateId}
        """

        cert_style = ParagraphStyle(
            'Certificate',
            parent=styles['Normal'],
            fontSize=14,
            alignment=TA_CENTER,
            spaceAfter=20
        )
        story.append(Paragraph(cert_text.replace('\n', '<br/>'), cert_style))

        doc.build(story)
        buffer.seek(0)

        pdf_base64 = base64.buffer.getvalue()).decode()
        return {"status": "success", "pdf": pdf_base64}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "document-generator"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)