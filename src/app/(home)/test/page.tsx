
const Login = () => {
  return (
      <>
           <div className="flex h-screen">
  <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-6">
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">تسجيل الدخول</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-500 text-sm mb-2">اسم المستخدم</label>
          <input
            type="text"
            id="username"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
            placeholder="محمد أحمد"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-500 text-sm mb-2">كلمة المرور</label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
            placeholder="********"
          />
          <div className="flex justify-between text-sm mt-2">
            <a href="#" className="text-green-500">هل نسيت كلمة المرور؟</a>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <input type="checkbox" id="remember" className="mr-2 focus:ring-green-500" />
          <label className="text-gray-500 text-sm">تذكرني</label>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          تسجيل دخول
        </button>
      </form>

      <div className="my-6 flex items-center">
        <hr className="w-full border-t border-gray-300" />
        <span className="px-2 text-gray-400">أو التسجيل من خلال</span>
        <hr className="w-full border-t border-gray-300" />
      </div>

      <div className="flex space-x-4 justify-center">
        <button className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200">
          <img src="/path-to-google-icon.svg" alt="Google" className="w-6 h-6" />
        </button>
        <button className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200">
          <img src="/path-to-facebook-icon.svg" alt="Facebook" className="w-6 h-6" />
        </button>
      </div>

      <div className="text-center mt-6">
        <p className="text-sm text-gray-500">
          ليس لديك حساب؟ <a href="#" className="text-green-500">إنشاء حساب جديد</a>
        </p>
      </div>
    </div>
  </div>

  <div className="hidden md:flex w-1/2 bg-gradient-to-br from-green-500 to-blue-500 items-center justify-center p-6">
    <div className="text-white text-center">
      <h1 className="text-4xl font-bold mb-4">يسوار</h1>
      <p className="text-lg mb-6">
        لا تفوت فرصة تطوير مهاراتك وتحقيق طموحاتك. انضم الآن إلى منصتنا التعليمية وابدأ رحلة التعلم نحو مستقبل أفضل!
      </p>
      <a href="#" className="inline-block bg-white text-green-500 py-2 px-4 rounded-lg hover:bg-gray-100">
        الدخول ك معلم
      </a>
    </div>
  </div>
</div>
    </>
  );
}

export default Login;
