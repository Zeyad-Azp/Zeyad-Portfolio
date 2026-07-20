import os
from pypdf import PdfReader

pdf_path = r"d:\Zeyad_Portfolio\ZeyadCV.pdf"
reader = PdfReader(pdf_path)
text = ""
for i, page in enumerate(reader.pages):
    text += f"--- Page {i+1} ---\n"
    text += page.extract_text() + "\n"

# Print text and also save it
print(text)
with open(r"C:\Users\mahmoud\.gemini\antigravity-ide\brain\8f681db8-29f3-4eab-af39-9b3d7efe0335\scratch\cv_text.txt", "w", encoding="utf-8") as f:
    f.write(text)
