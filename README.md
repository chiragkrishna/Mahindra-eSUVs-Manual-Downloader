DISCLAIMER: I am not responsible if you crash your car or your PC

Mahindra eSUV's Releases/Updates manuals regularly and doesnt give us a pdf or printed manually for offline use.

I have created a simple javascript, so that we can create pdf file from the latest [manual](https://mvault.mahindra.com/owners_manual) from Mahindra

NOTE: Works and Tested on Winodws 11

### Things you need

1) [Node.js](https://nodejs.org/en/download/current)
2) Chrome
3) Terminal
4) Any PDF Compressor ([PDFGear](https://www.pdfgear.com/))

### Steps

1) Go [here](https://mvault.mahindra.com/owners_manual) and open the Manual you want
2) Save the page as _Manual.mhtml_ (NOTE: dont save as html, you need to save as mhtml)
3) Download the _mhtml_to_pdf.js_
4) Place both _Manual.mhtml_ & _mhtml_to_pdf.js_ in one folder
5) Run the _mhtml_to_pdf.js_ in Terminal inside the folder as

```bash
# Install puppeteer if you dont have it first
npm install puppeteer

# Run the script
node mhtml_to_pdf.js "Manual.mhtml" "Vehicle_Manual.pdf"
```
6) Generated Vehicle_Manual.pdf file will be huge
7) use any pdf compresor to reduce the size
