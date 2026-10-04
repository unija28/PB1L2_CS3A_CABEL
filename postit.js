const userData = {
    fullName: "",
    birthDate: "",
    yearLevel: "",
    gender: "",
    username: "",
    password: ""
  
 };

 // Encryption key — you can change this to your own secret
 const SECRET_KEY = "PostIt_Secret_Key_2026!";
 // === STEP 1: Collect User Info ===
 document.getElementById("startBtn").addEventListener("click", function () {
   // Get all input values
   userData.fullName = document.getElementById("fullName").value.trim();
   userData.birthDate = document.getElementById("birthDate").value;
   userData.yearLevel = document.getElementById("yearLevel").value;
   userData.gender = document.getElementById("gender").value;
   userData.username = document.getElementById("username").value.trim();
   userData.password = document.getElementById("password").value;
   // Validate — all fields must be filled

   if (!userData.fullName || !userData.birthDate || !userData.yearLevel ||
       !userData.gender || !userData.username || !userData.password) {
     alert(" Please fill in ALL fields to continue!");
     return;
   }
   // Hide info form → Show post area
   
   document.getElementById("infoSection").classList.add("hidden");
   document.getElementById("postSection").classList.remove("hidden");
   document.getElementById("userNameDisplay").textContent = userData.username;
 });
 // === STEP 2: Encrypt Function ===
 // Format: "USERNAME || POST || DATE"
 function encryptPost(captionText) {
   const currentDate = new Date().toLocaleString();
   const dataString = {userData_username} || {captionText} || {currentDate};
   
   // AES Encrypt using CryptoJS
   const encrypted = CryptoJS.AES.encrypt(dataString, SECRET_KEY).toString();
   return encrypted;
 }
 // === STEP 3: Submit Post ===
 document.getElementById("postBtn").addEventListener("click", function () {
   const caption = document.getElementById("captionInput").value.trim();
   
   if (!caption) {
     alert(" Write something before posting!");
     return;
   }
   // Create encrypted value
   const encryptedValue = encryptPost(caption);
   // Build post card
   const postCard = document.createElement("div");
   postCard.className = "post-card";
   postCard.innerHTML = `
     <div class="label">ORIGINAL POST</div>
     <div class="original">{caption}</div>
     <div class="label">ENCRYPTED (Username + Post + Date)</div>
     <div class="encrypted">{encryptedValue}</div>
   `;
   // Add to thread — newest at the TOP
   document.getElementById("postsThread").prepend(postCard);
   // Clear input for next post
   document.getElementById("captionInput").value = "";
   
 });

