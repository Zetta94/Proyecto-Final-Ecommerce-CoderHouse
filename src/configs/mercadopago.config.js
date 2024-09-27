// import dotenv from 'dotenv'
// dotenv.config()

// const key = process.env.MP_KEY;

// const mp = new MercadoPago(key,{
//     local:"es-AR"
// })

// try{
//     document.getElementById("check-btn").addEventListener("click", async()=>{
//         const orderData = {
//             title:document.querySelector(".name").innerText,
//             quantity:1,
//             price:1,
//         }
//         const response = await fetch("http://localhost:8080/api/mercadopago",{
//             method:"POST",
//             headers:{
//                 "Content-Type" : "application/json"
//             },
//             body: JSON.stringify(orderData)
//         })
//         const preference = await response.json()
//         createCheckoutButton(preference.id)
//     })
// }catch(error){
//     alert("Error al realizar el pago")
// }

// const createCheckoutButton = (preferenceId) => {
//     if(window.checkoutButton){
//         window.checkoutButton.unmount()
//     }
//     const bricksBuilder = mp.bricks()
//     const renderComponent = async () =>{
//         mp.bricks().create("wallet", "wallet_container", {
//         initialization: {
//             preferenceId: preferenceId,
//         },
//         });
//     }
//     renderComponent()
// }