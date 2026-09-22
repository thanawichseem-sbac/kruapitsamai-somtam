let orders = [];
let total = 0;


// =========================
// เพิ่มอาหารลงตะกร้า
// =========================
function addOrder(name, price) {

    orders.push({
        name: name,
        price: price
    });

    total += price;

    showCart();
}


// =========================
// แสดงรายการในตะกร้า
// =========================
function showCart() {

    const cart = document.getElementById("cart");
    const totalElement = document.getElementById("total");

    if (orders.length === 0) {

        cart.innerHTML = "ยังไม่มีรายการอาหาร";
        totalElement.innerText = "0";

        return;
    }


    let html = "";


    orders.forEach(function(item, index) {

        html += `
            <div class="cart-item">

                <span>
                    ${index + 1}.
                    ${item.name}
                    - ${item.price} บาท
                </span>

                <button
                    class="remove-button"
                    onclick="removeOrder(${index})"
                >
                    ลบ
                </button>

            </div>
        `;

    });


    cart.innerHTML = html;

    totalElement.innerText = total;
}


// =========================
// ลบอาหาร
// =========================
function removeOrder(index) {

    total -= orders[index].price;

    orders.splice(index, 1);

    showCart();
}


// =========================
// กดยืนยันการสั่งซื้อ
// =========================
function confirmOrder() {

    if (orders.length === 0) {

        alert("กรุณาเลือกอาหารก่อนสั่งซื้อ");

        return;
    }


    // แสดงยอดเงินใน Popup
    document.getElementById("paymentTotal").innerText = total;


    // เปิด Popup
    document.getElementById("payment").classList.add("show");
}


// =========================
// ปิด Popup
// =========================
function closePayment() {

    document.getElementById("payment").classList.remove("show");
}


// =========================
// เลือกสลิป
// =========================
document.addEventListener("DOMContentLoaded", function() {

    const slipFile = document.getElementById("slipFile");
    const fileName = document.getElementById("fileName");


    if (slipFile) {

        slipFile.addEventListener("change", function() {

            if (slipFile.files.length > 0) {

                fileName.innerText =
                    "📄 " + slipFile.files[0].name;

            } else {

                fileName.innerText =
                    "ยังไม่ได้เลือกสลิป";

            }

        });

    }

});


// =========================
// ยืนยันการชำระเงิน
// =========================
function submitSlip() {

    const slipFile =
        document.getElementById("slipFile");


    if (!slipFile.files || slipFile.files.length === 0) {

        alert("กรุณาแนบสลิปการโอนเงินก่อน");

        return;
    }


    alert(
        "✅ ส่งสลิปเรียบร้อยแล้ว\n\n" +
        "ยอดชำระ: " + total + " บาท\n\n" +
        "ขอบคุณที่สั่งอาหารกับครัวพิศมัย ❤️"
    );


    closePayment();
}