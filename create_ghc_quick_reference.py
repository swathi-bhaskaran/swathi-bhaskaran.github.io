#!/usr/bin/env python3
"""
Create GHC Quick Reference Card
A small card with key information for networking
"""

from PIL import Image, ImageDraw, ImageFont
import qrcode

def create_quick_reference():
    """Create a quick reference card for GHC networking"""
    
    # Card dimensions (4" x 3")
    card_width = 1200  # 4" at 300 DPI
    card_height = 900  # 3" at 300 DPI
    
    card = Image.new('RGB', (card_width, card_height), 'white')
    draw = ImageDraw.Draw(card)
    
    # Create QR code
    qr = qrcode.QRCode(
        version=2,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=6,
        border=2,
    )
    qr.add_data("https://hq4743.github.io/")
    qr.make(fit=True)
    qr_image = qr.make_image(fill_color="#2C3E50", back_color="white")
    qr_image = qr_image.resize((200, 200), Image.Resampling.LANCZOS)
    
    # Paste QR code on the right
    qr_x = card_width - 250
    qr_y = 50
    card.paste(qr_image, (qr_x, qr_y))
    
    # Add GHC branding
    draw.rectangle([0, 0, card_width, 15], fill="#E74C3C")
    draw.rectangle([0, 0, 15, card_height], fill="#3498DB")
    
    # Add text
    try:
        title_font = ImageFont.truetype("arial.ttf", 24)
        header_font = ImageFont.truetype("arial.ttf", 18)
        text_font = ImageFont.truetype("arial.ttf", 14)
        small_font = ImageFont.truetype("arial.ttf", 12)
    except:
        title_font = ImageFont.load_default()
        header_font = ImageFont.load_default()
        text_font = ImageFont.load_default()
        small_font = ImageFont.load_default()
    
    # Title
    draw.text((30, 30), "GHC 2025 - Quick Reference", fill="#E74C3C", font=title_font)
    
    # Contact Info
    draw.text((30, 80), "SWATHI BHASKARAN", fill="#2C3E50", font=header_font)
    draw.text((30, 105), "Data Analyst | Business Intelligence Specialist", fill="#3498DB", font=text_font)
    
    # Contact details
    draw.text((30, 140), "📧 swathibhaskaran751@gmail.com", fill="#34495E", font=text_font)
    draw.text((30, 165), "📱 +1 (586) 345-2924", fill="#34495E", font=text_font)
    draw.text((30, 190), "📍 Clinton Township, MI", fill="#34495E", font=text_font)
    draw.text((30, 215), "🌐 hq4743.github.io", fill="#3498DB", font=text_font)
    
    # Key Skills
    draw.text((30, 260), "KEY SKILLS:", fill="#E74C3C", font=header_font)
    draw.text((30, 285), "SQL • Tableau • Python • DuckDB • AWS", fill="#7F8C8D", font=text_font)
    
    # Recent Project
    draw.text((30, 320), "RECENT PROJECT:", fill="#E74C3C", font=header_font)
    draw.text((30, 345), "Amazon Logistics Analysis", fill="#2C3E50", font=text_font)
    draw.text((30, 365), "• $3.2M+ revenue recovery potential", fill="#27AE60", font=small_font)
    draw.text((30, 385), "• 128K+ records analyzed", fill="#27AE60", font=small_font)
    draw.text((30, 405), "• 72% revenue at risk identified", fill="#27AE60", font=small_font)
    
    # Elevator Pitch
    draw.text((30, 450), "ELEVATOR PITCH:", fill="#E74C3C", font=header_font)
    draw.text((30, 475), "I'm a Data Analyst who transforms complex", fill="#34495E", font=small_font)
    draw.text((30, 495), "data into actionable business insights. I recently", fill="#34495E", font=small_font)
    draw.text((30, 515), "identified $3.2M+ in revenue recovery opportunities", fill="#34495E", font=small_font)
    draw.text((30, 535), "through comprehensive logistics data analysis.", fill="#34495E", font=small_font)
    
    # Conversation Starters
    draw.text((30, 580), "CONVERSATION STARTERS:", fill="#E74C3C", font=header_font)
    draw.text((30, 605), "• What data challenges is your team facing?", fill="#34495E", font=small_font)
    draw.text((30, 625), "• I'd love to learn about data opportunities", fill="#34495E", font=small_font)
    draw.text((30, 645), "• What's your favorite data visualization tool?", fill="#34495E", font=small_font)
    draw.text((30, 665), "• What trends are you seeing in data analytics?", fill="#34495E", font=small_font)
    
    # QR code label
    draw.text((qr_x, qr_y + 210), "Scan for Portfolio", fill="#7F8C8D", font=small_font)
    
    # GHC branding
    draw.text((30, 720), "Grace Hopper Celebration 2025", fill="#E74C3C", font=text_font)
    draw.text((30, 745), "Let's Connect! 👋", fill="#27AE60", font=text_font)
    
    card.save("ghc_quick_reference.png", "PNG", dpi=(300, 300))
    return "ghc_quick_reference.png"

if __name__ == "__main__":
    print("🎯 Creating GHC Quick Reference Card...")
    
    reference_card = create_quick_reference()
    
    print(f"✅ Quick Reference Card Created: {reference_card}")
    print("📏 Size: 4\" x 3\" (fits in pocket or notebook)")
    print("💡 Perfect for quick reference during networking!")
    print("🚀 Ready for GHC 2025!")
