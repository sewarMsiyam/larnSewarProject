// Step2.tsx
import { useFormContext } from 'react-hook-form';

const Step2 = () => {
    const { register } = useFormContext();

    return (
        <div>
            <label>Email:</label>
            <input {...register('email')} />
        </div>
    );
};

export default Step2;
