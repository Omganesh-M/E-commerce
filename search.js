let boxes = Array.from(document.getElementsByClassName("box"));
let search = document.getElementById("searchInput");
let container = document.querySelector(".collection-of-items");

let noResultMsg = document.createElement("p");
noResultMsg.innerText = "No products found";
noResultMsg.style.display = "none";
noResultMsg.style.textAlign = "center";
noResultMsg.style.marginTop = "20px";
noResultMsg.style.fontWeight = "bold";
container.appendChild(noResultMsg);

boxes.forEach(box => {
  box._originalParent = box.parentNode;
  box._originalNext = box.nextSibling;
});

search.addEventListener("keyup", () => {
  let searchValue = search.value.toLowerCase();
  let matched = [];
  let unmatched = [];

  boxes.forEach(box => {
    let h5 = box.querySelector("h5");
    let h4 = box.querySelector("h4");
    let productName = (h5 || h4)?.innerText.toLowerCase() || "";

    if (productName.includes(searchValue)) {
      matched.push(box);
    } else {
      unmatched.push(box);
    }
  });

  boxes.forEach(box => {
    if (box.parentNode) box.parentNode.removeChild(box);
  });

  if (searchValue) {
    if (matched.length > 0) {
      matched.forEach(box => {
        box.style.display = "";
        container.appendChild(box);
      });
      noResultMsg.style.display = "none";
    } else {
      noResultMsg.style.display = "block";
    }
    unmatched.forEach(box => (box.style.display = "none"));
  } else {
    boxes.forEach(box => {
      box.style.display = "";
      if (box._originalNext && box._originalNext.parentNode === box._originalParent) {
        box._originalParent.insertBefore(box, box._originalNext);
      } else {
        box._originalParent.appendChild(box);
      }
    });
    noResultMsg.style.display = "none";
  }
});


document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    let box = btn.closest('.box');
    let img = box.querySelector('img');
    let namePrice = box.querySelector('h5,h4');
    if (!img || !namePrice) return;

    let text = namePrice.textContent.trim();
    let parts = text.split(':');
    let name = parts[0].trim();
    let price = parseInt(parts[1].replace(/[^\d]/g, ''), 10);

    let item = {
      name: name,
      price: price,
      qty: 1,
      img: img.getAttribute('src')
    };

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let found = cart.find(c => c.name === item.name);

    if (found) {
      found.qty += 1;
    } else {
      cart.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    btn.textContent = "Added!";
    btn.style.backgroundColor = "green";
    setTimeout(() => {
      btn.textContent = "Add to cart";
      btn.style.backgroundColor = "";
    }, 2000);
  });
});
