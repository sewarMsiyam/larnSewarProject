// app/api/interfaces.ts
export interface Course {
    id: number;
    name: string;
    image: string;
    instructor_name: string;
    instructor_image: string;
    number_of_lessons: string;
    lesson_time: string;
    number_of_workingـpapers: string;
    number_of_office_time_per_week: string;
    price: string;
}

export interface Review {
    id: number;
    customer_img: string;
    rating: number;
    comment: string;
    customer_name: string;
    customer_position: string;
}
