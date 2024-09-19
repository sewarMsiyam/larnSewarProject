import TitleSection from '@/components/title';

export default function Registrationsteps(){
  return(
  <>
    <div className="container mt-20">
        <TitleSection text="خطوات التسجيل" />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
            <div className="bg-[url('/steps.png')] bg-cover bg-center text-center p-10 lg:p-20 flex-col justify-center items-center transition-all duration-200 hover:scale-105	">
                <img src="/step1.svg" alt="" className='mx-auto'  />
                <h3 className='text-lg font-bold mt-8'>سجل دخولك في الموقع</h3>
            </div>
            <div className="bg-[url('/steps.png')] bg-cover bg-center text-center p-10 lg:p-20 flex-col justify-center items-center transition-all duration-200 hover:scale-105	">
                <img src="/step2.svg" alt="" className='mx-auto'  />
                <h3 className='text-lg font-bold mt-8'>اختيار المادة والمعلم</h3>
            </div>
            <div className="bg-[url('/steps.png')] bg-cover bg-center text-center p-10 lg:p-20 flex-col justify-center items-center transition-all duration-200 hover:scale-105	">
                <img src="/step3.svg" alt="" className='mx-auto'  />
                <h3 className='text-lg font-bold mt-8'>السداد وبدء الدروس</h3>
            </div>
        </div>
    </div>
  </>
  );
}