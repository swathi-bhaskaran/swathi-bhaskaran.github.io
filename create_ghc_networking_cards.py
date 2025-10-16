#!/usr/bin/env python3
"""
Create Professional GHC Networking Cards
Multiple designs optimized for Grace Hopper Celebration networking
"""

from PIL import Image, ImageDraw, ImageFont
import qrcode
import os
from datetime import datetime

def create_ghc_business_card():
    """Create a professional GHC-focused business card"""
    
    # Card dimensions (standard business card: 3.5" x 2")
    card_width = 1050  # 3.5" at 300 DPI
    card_height = 600  # 2" at 300 DPI
    
    # Create card background with gradient effect
    card = Image.new('RGB', (card_width, card_height), 'white')
    draw = ImageDraw.Draw(card)
    
    # Create gradient background
    for y in range(card_height):
        color_value = int(255 - (y / card_height) * 30)  # Subtle gradient
        draw.line([(0, y), (card_width, y)], fill=(color_value, color_value, color_value))
    
    # Create QR code for portfolio
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=6,
        border=2,
    )
    qr.add_data("https://hq4743.github.io/")
    qr.make(fit=True)
    qr_image = qr.make_image(fill_color="#2C3E50", back_color="white")
    qr_image = qr_image.resize((180, 180), Image.Resampling.LANCZOS)
    
    # Paste QR code on the right side
    qr_x = card_width - 220
    qr_y = 50
    card.paste(qr_image, (qr_x, qr_y))
    
    # Add GHC branding elements
    # Top border with GHC colors
    draw.rectangle([0, 0, card_width, 12], fill="#E74C3C")  # Red
    draw.rectangle([0, 12, card_width, 20], fill="#F39C12")  # Orange
    
    # Left side accent with data visualization theme
    draw.rectangle([0, 0, 12, card_height], fill="#3498DB")  # Blue
    
    # Data visualization icons (left side)
    # Bar chart
    bar_chart_x = 30
    bar_chart_y = 80
    bars = [(bar_chart_x, bar_chart_y + 40, bar_chart_x + 12, bar_chart_y + 60),
            (bar_chart_x + 16, bar_chart_y + 30, bar_chart_x + 28, bar_chart_y + 60),
            (bar_chart_x + 32, bar_chart_y + 20, bar_chart_x + 44, bar_chart_y + 60),
            (bar_chart_x + 48, bar_chart_y + 35, bar_chart_x + 60, bar_chart_y + 60)]
    
    colors = ["#3498DB", "#E74C3C", "#F39C12", "#27AE60"]
    for i, (x1, y1, x2, y2) in enumerate(bars):
        draw.rectangle([x1, y1, x2, y2], fill=colors[i])
    
    # Trend line
    trend_x = 30
    trend_y = 120
    points = [(trend_x, trend_y + 30), (trend_x + 20, trend_y + 20), 
              (trend_x + 40, trend_y + 10), (trend_x + 60, trend_y + 5)]
    draw.line(points, fill="#3498DB", width=3)
    
    # Database icon
    db_x = 30
    db_y = 150
    for i in range(3):
        y_offset = i * 15
        draw.ellipse([db_x, db_y + y_offset, db_x + 40, db_y + 15 + y_offset], 
                    outline="#3498DB", width=2)
    
    # Add text with professional fonts
    try:
        name_font = ImageFont.truetype("arial.ttf", 28)
        title_font = ImageFont.truetype("arial.ttf", 16)
        contact_font = ImageFont.truetype("arial.ttf", 12)
        url_font = ImageFont.truetype("arial.ttf", 10)
        ghc_font = ImageFont.truetype("arial.ttf", 14)
    except:
        name_font = ImageFont.load_default()
        title_font = ImageFont.load_default()
        contact_font = ImageFont.load_default()
        url_font = ImageFont.load_default()
        ghc_font = ImageFont.load_default()
    
    # Name
    draw.text((30, 220), "SWATHI BHASKARAN", fill="#2C3E50", font=name_font)
    
    # Title
    draw.text((30, 250), "Data Analyst | Business Intelligence Specialist", fill="#3498DB", font=title_font)
    
    # Key skills
    draw.text((30, 275), "SQL • Tableau • Python • DuckDB • AWS", fill="#7F8C8D", font=contact_font)
    
    # Contact info
    draw.text((30, 300), "📧 swathibhaskaran751@gmail.com", fill="#34495E", font=contact_font)
    draw.text((30, 315), "📱 +1 (586) 345-2924", fill="#34495E", font=contact_font)
    draw.text((30, 330), "📍 Clinton Township, MI", fill="#34495E", font=contact_font)
    
    # Portfolio URL
    draw.text((30, 355), "Portfolio: hq4743.github.io", fill="#3498DB", font=url_font)
    
    # GHC 2025 branding
    draw.text((30, 375), "Grace Hopper Celebration 2025", fill="#E74C3C", font=ghc_font)
    draw.text((30, 390), "Let's Connect! 👋", fill="#27AE60", font=contact_font)
    
    # QR code label
    draw.text((qr_x, qr_y + 190), "Scan for Portfolio", fill="#7F8C8D", font=url_font)
    
    # Save the card
    card.save("ghc_business_card.png", "PNG", dpi=(300, 300))
    return "ghc_business_card.png"

def create_ghc_mini_card():
    """Create a mini card for quick networking"""
    
    # Mini card dimensions (2" x 1.5")
    card_width = 600  # 2" at 300 DPI
    card_height = 450  # 1.5" at 300 DPI
    
    card = Image.new('RGB', (card_width, card_height), 'white')
    draw = ImageDraw.Draw(card)
    
    # Create QR code
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=4,
        border=1,
    )
    qr.add_data("https://hq4743.github.io/")
    qr.make(fit=True)
    qr_image = qr.make_image(fill_color="#2C3E50", back_color="white")
    qr_image = qr_image.resize((120, 120), Image.Resampling.LANCZOS)
    
    # Paste QR code on the right
    qr_x = card_width - 140
    qr_y = 20
    card.paste(qr_image, (qr_x, qr_y))
    
    # Add GHC colors
    draw.rectangle([0, 0, card_width, 8], fill="#E74C3C")
    draw.rectangle([0, 0, 8, card_height], fill="#3498DB")
    
    # Add text
    try:
        name_font = ImageFont.truetype("arial.ttf", 20)
        title_font = ImageFont.truetype("arial.ttf", 12)
        contact_font = ImageFont.truetype("arial.ttf", 10)
    except:
        name_font = ImageFont.load_default()
        title_font = ImageFont.load_default()
        contact_font = ImageFont.load_default()
    
    # Name
    draw.text((20, 30), "SWATHI BHASKARAN", fill="#2C3E50", font=name_font)
    
    # Title
    draw.text((20, 55), "Data Analyst | BI Specialist", fill="#3498DB", font=title_font)
    
    # Skills
    draw.text((20, 75), "SQL • Tableau • Python", fill="#7F8C8D", font=contact_font)
    
    # Contact
    draw.text((20, 95), "📧 swathibhaskaran751@gmail.com", fill="#34495E", font=contact_font)
    draw.text((20, 110), "📱 +1 (586) 345-2924", fill="#34495E", font=contact_font)
    
    # GHC branding
    draw.text((20, 130), "GHC 2025 • Let's Connect! 👋", fill="#E74C3C", font=contact_font)
    
    # QR label
    draw.text((qr_x, qr_y + 125), "Portfolio", fill="#7F8C8D", font=contact_font)
    
    card.save("ghc_mini_card.png", "PNG", dpi=(300, 300))
    return "ghc_mini_card.png"

def create_ghc_sticker():
    """Create a sticker design for GHC"""
    
    # Sticker dimensions (2" x 2")
    size = 600  # 2" at 300 DPI
    
    sticker = Image.new('RGB', (size, size), 'white')
    draw = ImageDraw.Draw(sticker)
    
    # Create circular sticker with border
    border_width = 8
    draw.ellipse([border_width, border_width, size-border_width, size-border_width], 
                outline="#E74C3C", width=border_width)
    
    # Create QR code
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=6,
        border=1,
    )
    qr.add_data("https://hq4743.github.io/")
    qr.make(fit=True)
    qr_image = qr.make_image(fill_color="#2C3E50", back_color="white")
    qr_image = qr_image.resize((200, 200), Image.Resampling.LANCZOS)
    
    # Paste QR code in center
    qr_x = (size - 200) // 2
    qr_y = (size - 200) // 2 - 20
    sticker.paste(qr_image, (qr_x, qr_y))
    
    # Add text
    try:
        name_font = ImageFont.truetype("arial.ttf", 16)
        title_font = ImageFont.truetype("arial.ttf", 12)
        ghc_font = ImageFont.truetype("arial.ttf", 14)
    except:
        name_font = ImageFont.load_default()
        title_font = ImageFont.load_default()
        ghc_font = ImageFont.load_default()
    
    # Name
    draw.text((size//2 - 80, qr_y + 220), "SWATHI BHASKARAN", fill="#2C3E50", font=name_font)
    
    # Title
    draw.text((size//2 - 60, qr_y + 240), "Data Analyst", fill="#3498DB", font=title_font)
    
    # GHC branding
    draw.text((size//2 - 50, qr_y + 260), "GHC 2025", fill="#E74C3C", font=ghc_font)
    
    sticker.save("ghc_sticker.png", "PNG", dpi=(300, 300))
    return "ghc_sticker.png"

def create_ghc_digital_card():
    """Create a digital card for social media sharing"""
    
    # Digital card dimensions (16:9 ratio)
    card_width = 1200
    card_height = 675
    
    card = Image.new('RGB', (card_width, card_height), 'white')
    draw = ImageDraw.Draw(card)
    
    # Create gradient background
    for y in range(card_height):
        color_value = int(240 - (y / card_height) * 40)
        draw.line([(0, y), (card_width, y)], fill=(color_value, color_value, color_value))
    
    # Create QR code
    qr = qrcode.QRCode(
        version=2,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=8,
        border=2,
    )
    qr.add_data("https://hq4743.github.io/")
    qr.make(fit=True)
    qr_image = qr.make_image(fill_color="#2C3E50", back_color="white")
    qr_image = qr_image.resize((250, 250), Image.Resampling.LANCZOS)
    
    # Paste QR code on the right
    qr_x = card_width - 300
    qr_y = 100
    card.paste(qr_image, (qr_x, qr_y))
    
    # Add decorative elements
    draw.rectangle([0, 0, card_width, 15], fill="#E74C3C")
    draw.rectangle([0, 0, 15, card_height], fill="#3498DB")
    
    # Data visualization elements
    # Bar chart
    bar_x = 50
    bar_y = 150
    bars = [(bar_x, bar_y + 60, bar_x + 20, bar_y + 120),
            (bar_x + 30, bar_y + 40, bar_x + 50, bar_y + 120),
            (bar_x + 60, bar_y + 20, bar_x + 80, bar_y + 120),
            (bar_x + 90, bar_y + 50, bar_x + 110, bar_y + 120)]
    
    colors = ["#3498DB", "#E74C3C", "#F39C12", "#27AE60"]
    for i, (x1, y1, x2, y2) in enumerate(bars):
        draw.rectangle([x1, y1, x2, y2], fill=colors[i])
    
    # Add text
    try:
        name_font = ImageFont.truetype("arial.ttf", 48)
        title_font = ImageFont.truetype("arial.ttf", 24)
        contact_font = ImageFont.truetype("arial.ttf", 18)
        url_font = ImageFont.truetype("arial.ttf", 16)
        ghc_font = ImageFont.truetype("arial.ttf", 28)
    except:
        name_font = ImageFont.load_default()
        title_font = ImageFont.load_default()
        contact_font = ImageFont.load_default()
        url_font = ImageFont.load_default()
        ghc_font = ImageFont.load_default()
    
    # Name
    draw.text((50, 50), "SWATHI BHASKARAN", fill="#2C3E50", font=name_font)
    
    # Title
    draw.text((50, 100), "Data Analyst | Business Intelligence Specialist", fill="#3498DB", font=title_font)
    
    # Skills
    draw.text((50, 300), "SQL • Tableau • Python • DuckDB • AWS", fill="#7F8C8D", font=contact_font)
    
    # Contact info
    draw.text((50, 330), "📧 swathibhaskaran751@gmail.com", fill="#34495E", font=contact_font)
    draw.text((50, 355), "📱 +1 (586) 345-2924", fill="#34495E", font=contact_font)
    draw.text((50, 380), "📍 Clinton Township, MI", fill="#34495E", font=contact_font)
    
    # Portfolio URL
    draw.text((50, 420), "Portfolio: hq4743.github.io", fill="#3498DB", font=url_font)
    
    # GHC branding
    draw.text((50, 450), "Grace Hopper Celebration 2025", fill="#E74C3C", font=ghc_font)
    draw.text((50, 485), "Let's Connect! 👋", fill="#27AE60", font=contact_font)
    
    # QR code label
    draw.text((qr_x, qr_y + 260), "Scan for Portfolio", fill="#7F8C8D", font=url_font)
    
    card.save("ghc_digital_card.png", "PNG", dpi=(300, 300))
    return "ghc_digital_card.png"

def create_printing_guide():
    """Create a printing guide for the cards"""
    
    guide_width = 1200
    guide_height = 800
    
    guide = Image.new('RGB', (guide_width, guide_height), 'white')
    draw = ImageDraw.Draw(guide)
    
    try:
        title_font = ImageFont.truetype("arial.ttf", 32)
        header_font = ImageFont.truetype("arial.ttf", 24)
        text_font = ImageFont.truetype("arial.ttf", 16)
    except:
        title_font = ImageFont.load_default()
        header_font = ImageFont.load_default()
        text_font = ImageFont.load_default()
    
    # Title
    draw.text((50, 30), "GHC Networking Cards - Printing Guide", fill="#2C3E50", font=title_font)
    
    # Instructions
    y_pos = 100
    instructions = [
        "1. BUSINESS CARD (ghc_business_card.png):",
        "   • Size: 3.5\" x 2\" (standard business card)",
        "   • Print on cardstock or heavy paper",
        "   • Cut along the edges",
        "",
        "2. MINI CARD (ghc_mini_card.png):",
        "   • Size: 2\" x 1.5\"",
        "   • Perfect for quick networking",
        "   • Print 4 per page on standard paper",
        "",
        "3. STICKER (ghc_sticker.png):",
        "   • Size: 2\" x 2\" circular",
        "   • Print on sticker paper",
        "   • Cut in circular shape",
        "",
        "4. DIGITAL CARD (ghc_digital_card.png):",
        "   • Size: 16:9 ratio (1200x675px)",
        "   • Perfect for social media sharing",
        "   • Use on LinkedIn, Twitter, etc.",
        "",
        "PRINTING TIPS:",
        "• Use 300 DPI for best quality",
        "• Print on matte or semi-gloss paper",
        "• Consider professional printing for business cards",
        "• Test print one copy first"
    ]
    
    for instruction in instructions:
        if instruction.startswith(("1.", "2.", "3.", "4.", "PRINTING")):
            draw.text((50, y_pos), instruction, fill="#E74C3C", font=header_font)
        else:
            draw.text((70, y_pos), instruction, fill="#34495E", font=text_font)
        y_pos += 25
    
    guide.save("ghc_printing_guide.png", "PNG", dpi=(300, 300))
    return "ghc_printing_guide.png"

if __name__ == "__main__":
    print("🎨 Creating GHC Networking Cards...")
    print("=" * 50)
    
    # Create all card designs
    business_card = create_ghc_business_card()
    mini_card = create_ghc_mini_card()
    sticker = create_ghc_sticker()
    digital_card = create_ghc_digital_card()
    printing_guide = create_printing_guide()
    
    print("\n✅ GHC Networking Cards Created:")
    print(f"1. Business Card: {business_card} (3.5\" x 2\")")
    print(f"2. Mini Card: {mini_card} (2\" x 1.5\")")
    print(f"3. Sticker: {sticker} (2\" x 2\" circular)")
    print(f"4. Digital Card: {digital_card} (16:9 ratio)")
    print(f"5. Printing Guide: {printing_guide}")
    
    print("\n🎯 Usage Tips:")
    print("• Business cards: Professional networking, job fairs")
    print("• Mini cards: Quick exchanges, elevator pitches")
    print("• Stickers: Laptop, water bottle, notebook")
    print("• Digital: Social media, email signatures")
    
    print("\n🚀 Ready for Grace Hopper Celebration 2025!")
    print("💡 Don't forget to bring plenty of cards!")

