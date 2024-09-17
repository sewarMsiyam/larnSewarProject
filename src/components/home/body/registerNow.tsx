export default function Registrationsteps(){
  return(
  <>
    <div className="container mt-40">
        <div className='bg-registerNow-gradient rounded-[30px] lg:rounded-[40px]'>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="text-white p-10 lg:p-20">
                    <h2 className=" text-2xl">طالب توجيهي أو جامعي ؟</h2>
                    <p className=" text-lg my-4 leading-10">لا تفوت فرصة تطوير مهاراتك وتحقيق طموحاتك! انضم الآن إلى منصتنا التعليمية وابدأ رحلة التعلم نحو مستقبل أفضل!</p>
                    <button className="border border-white text-white font-bold text-center py-2.5 w-40 m-1 rounded-2xl hover:bg-white hover:text-primary transition-all duration-200">سجل الآن</button>
                </div>
                <div className="hidden lg:block relative ">
                    <img src="/registerNow.png" alt="" className="absolute bottom-0 mx-auto" />
                </div>
            </div>
        </div>
    </div>
  </>
  );
}