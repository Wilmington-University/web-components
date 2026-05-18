//<![CDATA[
// Get references to the elements
// Variables defined with let and const are limited to the block they are declared in, like loops or conditionals. TODO Remove these globals!!!
const mainContent = document.querySelector('.Main-content'),
  chatButton = document.getElementById('chat-button'),
  chatWindow = document.getElementById('chat-window'),
  closeChatButton = document.getElementById('close-chat'),
  cookieWindow = document.querySelector('.cc-window');

/**
 * OBSERVE COOKIE BANNER VISIBILITY with mutationObserver
 *
 * Check to see if the 'cc-invisible' class exists on the cookie banner using MutationObserver.
 * Update the position of the chat button based on the presence of the cookie banner
 */
const observedClass = "cc-invisible";
const cookieObserver = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "attributes" && mutation.attributeName === "class") {
      const isActive = mutation.target.classList.contains(observedClass);
      const elementHeight = chatButton.offsetHeight;
      if (isActive) {
        //chatButton.style.bottom = `${elementHeight}px`;
      } else {
        // chatButton.style.backgroundColor = "red";
        // chatButton.style.bottom = "1rem";
      }
    }
  }
});

// 3. Define the observer options
// We only need to observe attribute changes, specifically the 'class' attribute
const cookieConfig = {
  attributes: true,
  attributeFilter: ["class"]
};

// 4. Start observing the target element
cookieObserver.observe(chatButton, cookieConfig);
console.log(`Observer started for chatButton`);

cookieObserver.disconnect();

const resizeObserver = new ResizeObserver((entries) => {
  // The callback function runs every time an observed element changes size
  for (const entry of entries) {
    if (entry.target === cookieWindow) {
      // Get the height of the first element's content box

      const { height } = entry.contentRect;

      // Position the second element based on this height
      chatButton.animate(
        [
          // Keyframes
          // { transform: 'translateX(0)' },
          // { transform: 'translateX(100px)' }
        ],
        {
          // Timing options
          duration: 1000, // milliseconds
          easing: "ease-in-out", // Use CSS easing keywords
          iterations: 1, // Number of times to run
          fill: "both" // Retain the final state after animation
        }
      );
      const pxTorem = height / 16;
      const addMore = 0.625;
      chatButton.style.bottom = chatButton.style.bottom = `${(
        pxTorem + addMore
      ).toFixed(3)}rem`;
      //
      // Alternatively, set its position if using absolute positioning:
      // secondElement.style.top = `${height}px`;
    }
  }
});

// 3. Start observing the first element for size changes
resizeObserver.observe(cookieWindow);

const applyCookieStyles = () => {
  try {
    const elementHeight = cookieWindow.offsetHeight;
    const remValue = elementHeight / 16;
    const newBottom = remValue + 0.625;
    if (cookieWindow && cookieWindow.classList.contains("cc-invisible")) {
      console.log(
        `applyCookieStyles INVISIBLE. ${elementHeight}, ${newBottom}rem`
      );
      chatButton.classList.toggle("is-visible");
    } else {
      console.log(`applyCookieStyles VISIBLE. ${newBottom}rem`);
      chatButton.classList.add("is-visible");
    }
  } catch (err) {
    console.error(`Something\'s not right: ${err}`);
  }
};

window.addEventListener("load", applyCookieStyles);

// Function to open the chat
function openChat() {
  let chatInputField = document.querySelector(
    ".webchat__send-box-text-box__input"
  );
  chatWindow.showModal();
  mainContent.setAttribute('inert', ''); // make main content non-interactive and hidden from screen readers.
  chatWindow.setAttribute("aria-hidden", "false");
  chatButton.setAttribute("aria-expanded", "true");

  // The browser overtakes focus so we set a delay to let it finish before we reset focus to the textfield.
  setTimeout(() => {
    if (chatInputField) {
      chatInputField.focus();
      chatButton.blur();
      chatButton.style.visibility = "hidden";
      chatButton.style.pointerEvents = "none";
    }
  }, 500);
}

function closeChat() {
  chatWindow.close();
  mainContent.removeAttribute('inert', '');// make main content interactive and visible to screen readers.
  chatWindow.setAttribute("aria-hidden", "true");
  chatButton.setAttribute("aria-expanded", "false");
  // The browser overtakes focus so we set a delay to let it finish before we reset focus to the chat button.
  setTimeout(() => {
    chatButton.focus();
    chatButton.style.visibility = "visible";
    chatButton.style.pointerEvents = "auto";
  }, 500);
}

// Add click event listeners
chatButton.addEventListener("click", () => {
  const isExpanded = chatButton.getAttribute("aria-expanded") === "false";
  if (isExpanded) {
    openChat();
  } else {
    closeChat();
  }
});

closeChatButton.addEventListener("click", closeChat);

let closeWindow = function (e) {
  switch (e.key) {
    case "Escape":
      e.preventDefault();
      closeChat();
      break;
  }
};

document.addEventListener("keydown", closeWindow, false);

// ]]>
