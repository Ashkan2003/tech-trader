import SignInSide from "./SignInSide";

export default function Home() {
  return (
    <div className="bg-slate-800">
      <SignInSide />
      <div>رمز</div>
      <div className="bg-slate-900 p-5">ایمیل</div>;
      <div className="bg-slate-900 p-5 font-IranSansWeb">ورود</div>;
    </div>
  );
}
