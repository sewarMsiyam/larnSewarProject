//PhoneNumberInput.tsx
"use client"
import {
    Control,
    FieldValues,
    Controller,
    FieldErrors,
    UseFormSetValue,
} from 'react-hook-form';
import PhoneInput, { CountryData } from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import libphonenumber from 'google-libphonenumber';
import { useState } from 'react';

// Define props for the PhoneInput component
interface PhoneInputProps {
    id: string;
    control: Control<FieldValues, any>;
    errors: FieldErrors<FieldValues>; // Update the type here
    setValue: UseFormSetValue<FieldValues>;
    isSubmitted: boolean;
}

// Validates the phone number format based on country information
const validatePhoneNumber = (
    value: string,
    inputInformation: CountryData
) => {
    const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
    const phoneNumber = value.substring(inputInformation.dialCode.length);
    
    try {
        const number = phoneUtil.parseAndKeepRawInput(phoneNumber, inputInformation.countryCode);
        return phoneUtil.isValidNumber(number);
    } catch (error) {
        return false;
    }
};

const PhoneNumberInput: React.FC<PhoneInputProps> = ({
    id,
    control,
    errors,
    setValue,
    isSubmitted,
}) => {
    const [phoneNumberData, setPhoneNumberData] = useState<CountryData>({
        name: 'INDIA',
        dialCode: '+91',
        countryCode: 'in',
        format: '+.. .....-.....',
    });

    const handleOnChange = (value: string, inputData: CountryData) => {
        setValue(id, value, { shouldValidate: isSubmitted });
        setPhoneNumberData(inputData);
    };

    return (
        <Controller
            name={id}
            control={control}
            rules={{
                required: 'Phone number is required!',
                validate: (fieldValue) => {
                    const isValid = validatePhoneNumber(
                        fieldValue,
                        phoneNumberData
                    );
                    return isValid || 'Phone Number is not valid!';
                },
            }}
            render={({ field }) => {
                return (
                    <div className="flex flex-col mb-6">
                        <PhoneInput
                            onChange={(value, inputData) =>
                                handleOnChange(value, inputData as CountryData)
                            }
                            value={field.value}
                            country={'in'}
                            inputStyle={{ width: '100%' }}
                            inputProps={{
                                className: `
                                    form-input
                                    py-3
                                    pr-4
                                    pl-[45px]
                                    border-solid
                                    border
                                    rounded-md
                                    text-gray-900
                                    shadow-sm ring-1
                                    ring-inset
                                    sm:text-[1.4rem]
                                    focus:ring-1
                                    focus:ring-inset
                                    focus:ring-emerald-600
                                    ${errors[id] && 'focus:ring-red-500'}
                                `,
                            }}
                            placeholder="Enter your phone number"
                            enableSearch
                            countryCodeEditable={false}
                            autoFormat
                        />
                        {errors[id] && errors[id]?.message && (
                            <span className="text-red-500 text-lg mt-1.5">
                                {errors[id]?.message as React.ReactNode}
                            </span>
                        )}
                    </div>
                );
            }}
        />
    );
};

export default PhoneNumberInput;
