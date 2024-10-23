
const textElement = document.querySelectorAll('span-course');
  console.log(textElement)
  textElement.forEach(node => {
    adjustFontSizeToFit(node);
  })
  function adjustFontSizeToFit(node) {
    const container = node.parentElement
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
  
  
    let fontSize = 16;
  
    // Decrease font size until the text fits within the container's width and height
    while (node.scrollWidth > containerWidth || node.scrollHeight > containerHeight) {
        console.log(fontSize);
        fontSize--;
        node.style.fontSize = fontSize + 'px';
    }
    // Call the function when the page loads
    window.onload = adjustFontSizeToFit;
    
    // Optionally, call the function when the window is resized (for responsiveness)
    window.onresize = adjustFontSizeToFit;
  }