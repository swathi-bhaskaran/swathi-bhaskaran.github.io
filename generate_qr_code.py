#!/usr/bin/env python3
"""
Generate QR Code for Portfolio
Creates a professional QR code linking to your portfolio
"""

import qrcode
from PIL import Image, ImageDraw, ImageFont
import os

def create_portfolio_qr():
    """Create a professional QR code for the portfolio"""
    
    # Your portfolio URL
    portfolio_url = "https://hq4743.github.io/Swathi-Bhaskaran/"
    
    # Create QR code
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4,
    )
    
    qr.add_data(portfolio_url)
    qr.make(fit=True)
    
    # Create QR code image
    qr_image = qr.make_image(fill_color="black", back_color="white")
    
    # Resize for better quality
    qr_image = qr_image.resize((400, 400), Image.Resampling.LANCZOS)
    
    # Create a larger canvas for text
    canvas_width = 500
    canvas_height = 600
    canvas = Image.new('RGB', (canvas_width, canvas_height), 'white')
    
    # Paste QR code in the center
    qr_x = (canvas_width - 400) // 2
    qr_y = 50
    canvas.paste(qr_image, (qr_x, qr_y))
    
    # Add text
    draw = ImageDraw.Draw(canvas)
    
    try:
        # Try to use a professional font
        title_font = ImageFont.truetype("arial.ttf", 24)
        subtitle_font = ImageFont.truetype("arial.ttf", 16)
        url_font = ImageFont.truetype("arial.ttf", 12)
    except:
        # Fallback to default font
        title_font = ImageFont.load_default()
        subtitle_font = ImageFont.load_default()
        url_font = ImageFont.load_default()
    
    # Add title
    title = "Swathi Bhaskaran"
    title_bbox = draw.textbbox((0, 0), title, font=title_font)
    title_width = title_bbox[2] - title_bbox[0]
    title_x = (canvas_width - title_width) // 2
    draw.text((title_x, 480), title, fill="black", font=title_font)
    
    # Add subtitle
    subtitle = "Data Analyst Portfolio"
    subtitle_bbox = draw.textbbox((0, 0), subtitle, font=subtitle_font)
    subtitle_width = subtitle_bbox[2] - subtitle_bbox[0]
    subtitle_x = (canvas_width - subtitle_width) // 2
    draw.text((subtitle_x, 510), subtitle, fill="gray", font=subtitle_font)
    
    # Add URL
    url_text = "hq4743.github.io/Swathi-Bhaskaran"
    url_bbox = draw.textbbox((0, 0), url_text, font=url_font)
    url_width = url_bbox[2] - url_bbox[0]
    url_x = (canvas_width - url_width) // 2
    draw.text((url_x, 540), url_text, fill="blue", font=url_font)
    
    # Save the image
    output_path = "portfolio_qr_code.png"
    canvas.save(output_path, "PNG", dpi=(300, 300))
    
    print(f"✅ QR code created successfully!")
    print(f"📁 Saved as: {output_path}")
    print(f"🔗 Links to: {portfolio_url}")
    print(f"📏 Size: {canvas_width}x{canvas_height} pixels")
    print(f"📱 Ready for printing on business cards!")
    
    return output_path

def create_simple_qr():
    """Create a simple QR code without text"""
    portfolio_url = "https://hq4743.github.io/Swathi-Bhaskaran/"
    
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4,
    )
    
    qr.add_data(portfolio_url)
    qr.make(fit=True)
    
    qr_image = qr.make_image(fill_color="black", back_color="white")
    qr_image = qr_image.resize((300, 300), Image.Resampling.LANCZOS)
    
    output_path = "simple_qr_code.png"
    qr_image.save(output_path, "PNG")
    
    print(f"✅ Simple QR code created: {output_path}")
    return output_path

if __name__ == "__main__":
    print("🚀 Creating QR Code for Portfolio...")
    print("=" * 50)
    
    # Create both versions
    professional_qr = create_portfolio_qr()
    simple_qr = create_simple_qr()
    
    print("\n🎯 QR Code Options Created:")
    print(f"1. Professional: {professional_qr} (with text)")
    print(f"2. Simple: {simple_qr} (QR only)")
    print("\n💡 Use the professional version for business cards!")
    print("💡 Use the simple version for stickers or small spaces!")
