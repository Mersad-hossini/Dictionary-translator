const searchBtn = document.getElementById("searchBtn");
const wordInput = document.getElementById("wordInput");
const result = document.getElementById("result");
const themeToggle = document.getElementById("themeToggle");

searchBtn.addEventListener("click", async () => {
  const word = wordInput.value.trim();
  if (!word) {
    result.innerHTML = `<p style="color:red;">لطفاً یک کلمه وارد کنید.</p>`;
    return;
  }

  result.innerHTML = `<p>در حال جستجو برای "<b>${word}</b>" ...</p>`;

  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        word
      )}&langpair=en|fa`
    );

    if (!res.ok) {
      result.innerHTML = `<p style="color:red;">خطا در ارتباط با سرور.</p>`;
      return;
    }

    const data = await res.json();
    console.log(data);
    

    const mainTranslation =
      data?.responseData?.translatedText || "ترجمه‌ای یافت نشد";
    const matches = data?.matches || [];

    const relatedTranslations = matches
      .filter((m) => m.translation && m.translation !== mainTranslation)
      .slice(0, 2)
      .map((m) => `<li>${m.translation}</li>`)
      .join("");

    result.innerHTML = `
      <h2>${word}</h2>
      <p><strong>ترجمه فارسی:</strong> ${mainTranslation}</p>
      ${
        relatedTranslations
          ? `<h3>🔹 معنی‌های مشابه:</h3><ul>${relatedTranslations}</ul>`
          : ""
      }
    `;
  } catch (err) {
    result.innerHTML = `<p style="color:red;">خطا در دریافت ترجمه: ${err.message}</p>`;
  }
});

// 🌙 تغییر حالت تیره / روشن
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark")
    ? "☀️ حالت روشن"
    : "🌓 تغییر حالت";
});
