#!/usr/bin/env python3
"""
Create Professional Business Card Design
Combines QR code with attractive logo design for Grace Hopper
"""

from PIL import Image, ImageDraw, ImageFont
import qrcode
import os

def create_business_card():
    """Create a professional business card design"""
    
    # Card dimensions (standard business card: 3.5" x 2")
    card_width = 1050  # 3.5" at 300 DPI
    card_height = 600  # 2" at 300 DPI
    
    # Create card background
    card = Image.new('RGB', (card_width, card_height), 'white')
    draw = ImageDraw.Draw(card)
    
    # Create QR code
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=8,
        border=2,
    )
    qr.add_data("https://hq4743.github.io/Swathi-Bhaskaran/")
    qr.make(fit=True)
    qr_image = qr.make_image(fill_color="black", back_color="white")
    qr_image = qr_image.resize((200, 200), Image.Resampling.LANCZOS)
    
    # Paste QR code on the right side
    qr_x = card_width - 250
    qr_y = 50
    card.paste(qr_image, (qr_x, qr_y))
    
    # Add decorative elements
    # Top border
    draw.rectangle([0, 0, card_width, 8], fill="#4A90E2")
    
    # Left side accent
    draw.rectangle([0, 0, 8, card_height], fill="#4A90E2")
    
    # Data visualization icons
    # Bar chart
    bar_chart_x = 30
    bar_chart_y = 80
    draw.rectangle([bar_chart_x, bar_chart_y + 40, bar_chart_x + 15, bar_chart_y + 60], fill="#4A90E2")
    draw.rectangle([bar_chart_x + 20, bar_chart_y + 30, bar_chart_x + 35, bar_chart_y + 60], fill="#7ED321")
    draw.rectangle([bar_chart_x + 40, bar_chart_y + 20, bar_chart_x + 55, bar_chart_y + 60], fill="#F5A623")
    
    # Trend line
    trend_x = 30
    trend_y = 120
    points = [(trend_x, trend_y + 30), (trend_x + 20, trend_y + 20), (trend_x + 40, trend_y + 10), (trend_x + 60, trend_y + 5)]
    draw.line(points, fill="#4A90E2", width=3)
    
    # Database icon
    db_x = 30
    db_y = 150
    draw.ellipse([db_x, db_y, db_x + 40, db_y + 20], outline="#4A90E2", width=2)
    draw.ellipse([db_x, db_y + 15, db_x + 40, db_y + 35], outline="#4A90E2", width=2)
    draw.ellipse([db_x, db_y + 30, db_x + 40, db_y + 50], outline="#4A90E2", width=2)
    
    # Add text
    try:
        # Try to use professional fonts
        name_font = ImageFont.truetype("arial.ttf", 32)
        title_font = ImageFont.truetype("arial.ttf", 18)
        contact_font = ImageFont.truetype("arial.ttf", 14)
        url_font = ImageFont.truetype("arial.ttf", 12)
    except:
        # Fallback to default font
        name_font = ImageFont.load_default()
        title_font = ImageFont.load_default()
        contact_font = ImageFont.load_default()
        url_font = ImageFont.load_default()
    
    # Name
    draw.text((30, 220), "SWATHI BHASKARAN", fill="#2C3E50", font=name_font)
    
    # Title
    draw.text((30, 260), "Data Analyst | Business Intelligence", fill="#4A90E2", font=title_font)
    
    # Skills
    draw.text((30, 290), "SQL • Tableau • Python • DuckDB", fill="#7F8C8D", font=contact_font)
    
    # Contact info
    draw.text((30, 320), "📧 swathibhaskaran751@gmail.com", fill="#34495E", font=contact_font)
    draw.text((30, 340), "📱 +1 (586) 345-2924", fill="#34495E", font=contact_font)
    draw.text((30, 360), "📍 Clinton Township, MI", fill="#34495E", font=contact_font)
    
    # Portfolio URL
    draw.text((30, 400), "Portfolio: hq4743.github.io/Swathi-Bhaskaran", fill="#4A90E2", font=url_font)
    
    # Grace Hopper 2025
    draw.text((30, 420), "Grace Hopper Celebration 2025", fill="#E74C3C", font=contact_font)
    
    # QR code label
    draw.text((qr_x, qr_y + 210), "Scan for Portfolio", fill="#7F8C8D", font=url_font)
    
    # Save the card
    card.save("business_card_design.png", "PNG", dpi=(300, 300))
    
    print("✅ Business card design created!")
    print("📁 Saved as: business_card_design.png")
    print("📏 Size: 3.5\" x 2\" (standard business card)")
    print("🎨 Professional design with QR code")
    
    return "business_card_design.png"

def create_simple_logo():
    """Create a simple logo for stickers or small spaces"""
    
    # Logo dimensions
    logo_size = 200
    logo = Image.new('RGB', (logo_size, logo_size), 'white')
    draw = ImageDraw.Draw(logo)
    
    # Background circle
    draw.ellipse([10, 10, logo_size - 10, logo_size - 10], fill="#4A90E2", outline="#2C3E50", width=3)
    
    # Data visualization elements
    # Bar chart
    bar_x = 50
    bar_y = 60
    draw.rectangle([bar_x, bar_y + 20, bar_x + 15, bar_y + 40], fill="white")
    draw.rectangle([bar_x + 20, bar_y + 10, bar_x + 35, bar_y + 40], fill="white")
    draw.rectangle([bar_x + 40, bar_y + 5, bar_x + 55, bar_y + 40], fill="white")
    
    # Trend line
    trend_x = 50
    trend_y = 100
    points = [(trend_x, trend_y + 20), (trend_x + 20, trend_y + 15), (trend_x + 40, trend_y + 10), (trend_x + 60, trend_y + 5)]
    draw.line(points, fill="white", width=3)
    
    # Database icon
    db_x = 50
    db_y = 130
    draw.ellipse([db_x, db_y, db_x + 30, db_y + 15], outline="white", width=2)
    draw.ellipse([db_x, db_y + 10, db_x + 30, db_y + 25], outline="white", width=2)
    draw.ellipse([db_x, db_y + 20, db_x + 30, db_y + 35], outline="white", width=2)
    
    # Add initials
    try:
        font = ImageFont.truetype("arial.ttf", 24)
    except:
        font = ImageFont.load_default()
    
    draw.text((80, 160), "SB", fill="white", font=font)
    
    # Save logo
    logo.save("simple_logo.png", "PNG")
    
    print("✅ Simple logo created!")
    print("📁 Saved as: simple_logo.png")
    print("📏 Size: 200x200 pixels")
    print("🎨 Perfect for stickers or small spaces")
    
    return "simple_logo.png"

if __name__ == "__main__":
    print("🎨 Creating Professional Logo Designs...")
    print("=" * 50)
    
    # Create designs
    business_card = create_business_card()
    simple_logo = create_simple_logo()
    
    print("\n🎯 Logo Options Created:")
    print(f"1. Business Card: {business_card} (full design)")
    print(f"2. Simple Logo: {simple_logo} (sticker size)")
    print("\n💡 Use business card design for networking!")
    print("💡 Use simple logo for stickers or small spaces!")
    print("\n🚀 Ready for Grace Hopper Celebration!")


