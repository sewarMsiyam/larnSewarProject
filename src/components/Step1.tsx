// Step1.tsx
import { useFormContext } from 'react-hook-form';

const Step1 = () => {
    const { register } = useFormContext();

    return (
        <div>
            <label>Name:</label>
            <input {...register('name')} />
            <label>Name:</label>
            <input {...register('name')} />
            <label>Name:</label>
            <input {...register('name')} />
            <label>Name:</label>
            <input {...register('name')} />
            <label>Name:</label>
            <input {...register('name')} />
        </div>
    );
};

export default Step1;
