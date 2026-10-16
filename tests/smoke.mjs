import { chromium } from "playwright";
import { fromZonedTime } from "date-fns-tz";
const browser = await chromium.launch({ headless: true, channel: "msedge" });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.emulateMedia({ reducedMotion: "reduce" });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.goto("http://127.0.0.1:5173/");
await page.locator("h1").waitFor();
await page.screenshot({ path: "tests/desktop.png", fullPage: true });
console.log("Public invitation:", await page.locator("h1").innerText());
await page.goto("http://127.0.0.1:5173/admin");
await page.waitForURL("**/admin/login");
await page.getByLabel("اسم المستخدم").fill("admin");
await page.getByLabel("كلمة المرور", { exact: true }).fill("wrong");
await page.getByRole("button", { name: "تسجيل الدخول", exact: true }).click();
await page.getByText("اسم المستخدم أو كلمة المرور غير صحيحة").waitFor();
await page.getByLabel("كلمة المرور", { exact: true }).fill("admin");
await page.getByRole("button", { name: "تسجيل الدخول", exact: true }).click();
await page.waitForURL("**/admin");
await page.getByLabel("اسم العريس").fill("عمر");
await page.getByRole("button", { name: "حفظ التغييرات" }).click();
await page.getByText("تم حفظ التعديلات بنجاح").waitFor();
await page.getByRole("link", { name: "معاينة الدعوة" }).click();
await page.waitForURL("http://127.0.0.1:5173/");
await page.getByRole("heading", { level: 1, name: /عمر/ }).waitFor();
await page.reload();
await page.locator("h1").waitFor();
if (!(await page.locator("h1").innerText()).includes("عمر"))
  throw Error("Persistence failed");
await page.goto("http://127.0.0.1:5173/admin");
await page.waitForURL("**/admin/login");
await page.getByLabel("اسم المستخدم").fill("admin");
await page.getByLabel("كلمة المرور", { exact: true }).fill("admin");
await page.getByRole("button", { name: "تسجيل الدخول", exact: true }).click();
await page.waitForURL("**/admin");
page.once("dialog", (d) => d.accept());
await page.getByRole("button", { name: "استعادة الافتراضي" }).click();
await page.waitForFunction(
  () => localStorage.getItem("wedding_invitation_content") === null,
);
if ((await page.getByLabel("اسم العريس").inputValue()) !== "أحمد")
  throw Error("Reset failed");
await page
  .getByLabel("المنطقة الزمنية (مثل Africa/Cairo)")
  .fill("invalid/zone");
await page.getByRole("button", { name: "حفظ التغييرات" }).click();
await page.getByText("منطقة زمنية غير صالحة").waitFor();
await page
  .getByLabel("المنطقة الزمنية (مثل Africa/Cairo)")
  .fill("Africa/Cairo");
await page.getByRole("button", { name: "حفظ التغييرات" }).click();
await page.screenshot({ path: "tests/admin.png", fullPage: true });
await page.getByRole("button", { name: "تسجيل الخروج" }).click();
await page.waitForURL("**/admin/login");
await page.setViewportSize({ width: 390, height: 844 });
await page.goto("http://127.0.0.1:5173/");
await page.locator("h1").waitFor();
await page.emulateMedia({ reducedMotion: "reduce" });
await page.screenshot({ path: "tests/mobile.png", fullPage: true });
if (
  await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  )
)
  throw Error("Mobile horizontal overflow");
const map = await page
  .getByRole("link", { name: "الموقع والاتجاهات" })
  .getAttribute("href");
if (!map.includes("google.com/maps")) throw Error("Maps fallback missing");
if (errors.length) throw Error(errors.join("\n"));
console.log(
  "PASS: route protection, invalid and valid login, edits, persistence, refresh login, reset, timezone validation, logout, mobile overflow, maps, no runtime errors",
);
if (
  fromZonedTime("2027-01-15T19:00:00", "Africa/Cairo").toISOString() !==
  "2027-01-15T17:00:00.000Z"
)
  throw Error("Cairo timezone conversion failed");
const before = await page.locator(".countdown").innerText();
await page.waitForFunction(
  (v) => document.querySelector(".countdown")?.innerText !== v,
  before,
);
await page.evaluate(() => {
  const c = JSON.parse(localStorage.getItem("wedding_invitation_content"));
  c.wedding.date = "2020-01-01";
  localStorage.setItem("wedding_invitation_content", JSON.stringify(c));
});
await page.reload();
await page.getByText("اليوم يوم فرحتنا!").waitFor();
await page.evaluate(() => {
  const c = JSON.parse(localStorage.getItem("wedding_invitation_content"));
  c.countdown.enabled = false;
  localStorage.setItem("wedding_invitation_content", JSON.stringify(c));
});
await page.reload();
await page.locator("h1").waitFor();
if (await page.locator(".countdown-section").count())
  throw Error("Countdown disable failed");
await page.evaluate(() =>
  localStorage.setItem("wedding_invitation_content", "invalid json"),
);
await page.reload();
await page.getByRole("heading", { level: 1, name: /أحمد/ }).waitFor();
await page.evaluate(() =>
  localStorage.removeItem("wedding_invitation_content"),
);
await page.emulateMedia({ reducedMotion: "no-preference" });
await page.reload();
await page.waitForFunction(() => {
  const n = document.querySelector(".name");
  return n && Number(getComputedStyle(n).opacity) === 1;
});
await page.locator("#details").scrollIntoViewIfNeeded();
await page.waitForFunction(
  () =>
    Number(getComputedStyle(document.querySelector("#details")).opacity) === 1,
);
console.log(
  "PASS: Cairo timezone, ticking countdown, completed countdown, disabled countdown, invalid storage fallback, GSAP entrance and scroll reveal",
);
await browser.close();
