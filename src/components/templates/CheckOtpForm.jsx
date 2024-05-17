import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { checkOtp } from "services/auth";
import { getProfile } from "services/user";
import { setCookie } from "utils/cookie";

import styles from "./CheckOtpForm.module.css";

function CheckOtpForm({ code, setCode, mobile, setStep }) {
  const navigate = useNavigate();
  const { refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (code.length !== 5) return;

    const { response, error } = await checkOtp(mobile, code);

    if (response) {
      setCookie(response.data);
      navigate("/");
      refetch();
    }

    if (error) console.log(error.response.data.message);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
        <h3>ورود به حساب کاربری</h3>
      </div>
      <label htmlFor="input">کد تأیید را وارد کنید</label>
      <span>کد پیامک‌شده به شمارۀ «{mobile}» را وارد کنید.</span>
      <input
        type="text"
        id="input"
        placeholder="کد تأیید ۵ رقمی"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={() => setStep(1)} className={styles.backButton}>
        تغییر شماره موبایل
      </button>
      <button type="submit">ورود</button>
    </form>
  );
}

export default CheckOtpForm;
