import { sendOtp } from "../../services/auth";

function SendOtpForm({ setStep, mobile, setMobile }) {
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (mobile.length !== 11) return;

    const { response, error } = await sendOtp(mobile);
    if (response) setStep(2);
    if (error) console.log(error.response.data.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <p>ورود به حساب کاربری</p>
      </div>
      <label htmlFor="input">شمارهٔ موبایل خود را وارد کنید</label>
      <p>
        برای استفاده از امکانات دیوار، لطفاً شمارهٔ موبایل خود را وارد کنید. کد
        تأیید به این شماره پیامک خواهد شد.
      </p>
      <input
        type="text"
        id="input"
        placeholder="شمارهٔ موبایل"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <p>
        <a href="#">شرایط استفاده از خدمات</a> و <a href="#">حریم خصوصی</a>{" "}
        دیوار را می‌پذیرم.
      </p>
      <button type="submit">تایید</button>
    </form>
  );
}

export default SendOtpForm;
