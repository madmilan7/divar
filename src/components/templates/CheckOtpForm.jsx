import { checkOtp } from "../../services/auth";

function CheckOtpForm({ code, setCode, mobile, setStep }) {
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (code.length !== 5) return;

    const { response, error } = await checkOtp(mobile, code);
    console.log({ response, error });

    if (response) {
      console.log(response);
    }

    if (error) console.log(error.response.data.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <p>ورود به حساب کاربری</p>
      </div>
      <label htmlFor="input">کد تأیید را وارد کنید</label>
      <p>کد پیامک‌شده به شمارۀ «{mobile}» را وارد کنید.</p>
      <input
        type="text"
        id="input"
        placeholder="کد تأیید ۵ رقمی"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={() => setStep(1)}>تغییر شماره موبایل</button>
      <button type="submit">ورود</button>
    </form>
  );
}

export default CheckOtpForm;
