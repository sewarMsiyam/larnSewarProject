export default function Registrationsteps(){
  return(
  <>
    <div className="container mt-40">
        <div className='bg-registerNow-gradient rounded-[30px] lg:rounded-[40px]'>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="text-white p-10 lg:p-20">
                    <h2 className=" text-2xl">طالب توجيهي أو جامعي ؟</h2>
                    <p className=" text-lg my-4 leading-10">لا تفوت فرصة تطوير مهاراتك وتحقيق طموحاتك! انضم الآن إلى منصتنا التعليمية وابدأ رحلة التعلم نحو مستقبل أفضل!</p>
                    <button className="border border-white text-white font-bold text-center py-2.5 w-40 m-1 rounded-2xl">سجل الآن</button>
                </div>
                <div className="hidden lg:block relative ">
                    <img src="/registerNow.png" alt="" className="absolute bottom-0 mx-auto" />
                </div>
            </div>
        </div>
        {/* <TitleSection text="خطوات التسجيل" />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
            <div className="bg-[url('/steps.png')] bg-cover bg-center text-center p-10 lg:p-20 flex-col justify-center items-center">
                <img src="/step1.svg" alt="" className='mx-auto'  />
                <h3 className='text-lg font-bold mt-8'>سجل دخولك في الموقع</h3>
            </div>
            <div className="bg-[url('/steps.png')] bg-cover bg-center text-center p-10 lg:p-20 flex-col justify-center items-center">
                <img src="/step2.svg" alt="" className='mx-auto'  />
                <h3 className='text-lg font-bold mt-8'>اختيار المادة والمعلم</h3>
            </div>
            <div className="bg-[url('/steps.png')] bg-cover bg-center text-center p-10 lg:p-20 flex-col justify-center items-center">
                <img src="/step3.svg" alt="" className='mx-auto'  />
                <h3 className='text-lg font-bold mt-8'>السداد وبدء الدروس</h3>
            </div>
        </div> */}
    </div>
  </>
  );
}