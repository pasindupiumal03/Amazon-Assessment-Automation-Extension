import { initPopup } from "./shadowRoot.jsx";

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "startAssessment") {
    let clicked = false;
    
    // First approach: iterate all buttons and check text
    const buttons = document.querySelectorAll('button');
    for (const btn of buttons) {
      if (btn.textContent.includes('Begin Assessment') || btn.innerText.includes('Begin Assessment')) {
        btn.click();
        clicked = true;
        break;
      }
    }

    // Second approach: use XPath if the above fails
    if (!clicked) {
      const xPathResult = document.evaluate(
        "//div[contains(text(), 'Begin Assessment')]",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      );
      const node = xPathResult.singleNodeValue;
      if (node) {
        // Try to find the closest button, or click the div itself
        const btn = node.closest('button');
        if (btn) {
          btn.click();
          clicked = true;
        } else {
          node.click();
          clicked = true;
        }
      }
    }

    sendResponse({ success: clicked });
  }
  return true; // Keep message channel open for async response
});