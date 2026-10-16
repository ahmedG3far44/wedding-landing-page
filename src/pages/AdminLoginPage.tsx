import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { Ornament } from "../components/ui/Ornament";
export function AdminLoginPage() {
  const [visible, setVisible] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ username: string; password: string }>();
  return (
    <main className="login-page" dir="rtl">
      <div className="login-card">
        <LockKeyhole className="login-icon" size={28} strokeWidth={1} />
        <h1>لوحة إدارة دعوة الزفاف</h1>
        <p>تسجيل الدخول لتعديل تفاصيل الدعوة</p>
        <Ornament />
        <form
          onSubmit={handleSubmit((v) => {
            if (login(v.username, v.password)) {
              toast.success("مرحباً بك");
              navigate("/admin");
            } else toast.error("اسم المستخدم أو كلمة المرور غير صحيحة");
          })}
        >
          <label>
            اسم المستخدم
            <input
              autoComplete="username"
              dir="ltr"
              {...register("username", { required: "أدخل اسم المستخدم" })}
            />
          </label>
          {errors.username && (
            <small role="alert">{errors.username.message}</small>
          )}
          <label>
            كلمة المرور
            <div className="password-field">
              <input
                type={visible ? "text" : "password"}
                autoComplete="current-password"
                dir="ltr"
                {...register("password", { required: "أدخل كلمة المرور" })}
              />
              <button
                type="button"
                onClick={() => setVisible(!visible)}
                aria-label={visible ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
              >
                {visible ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </label>
          {errors.password && (
            <small role="alert">{errors.password.message}</small>
          )}
          <button className="button" type="submit">
            تسجيل الدخول
          </button>
        </form>
        <Link className="back-link" to="/">
          العودة إلى الدعوة
        </Link>
      </div>
    </main>
  );
}
