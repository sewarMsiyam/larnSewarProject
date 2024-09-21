// app/api/interfaces.ts
export interface Course {
    id: number;
    name: string;
    description: string;
    image: string;
    instructor_name: string;
    instructor_image: string;
    number_of_lessons: string;
    lesson_time: string;
    number_of_workingـpapers: string;
    number_of_office_time_per_week: string;
    duration:string;
    price: string;
    course_features: Array<{
        id: number;
        feature: string;
    }>;
    course_durations: Array<{
        id: number;
        day: string;
        from_time: string;
        to_time: string;
    }>;

    slug:string;


}

export interface Review {
    id: number;
    customer_img: string;
    rating: number;
    comment: string;
    customer_name: string;
    customer_position: string;
}


export interface Instructors{
    slug:string;
    id: number;
    name: string;
    image: string;
    description: string;
    skills: string[];


    instructor_durations: Array<{
        id: number;
        day: string;
        from_time: string;
        to_time: string;
    }>;
    courses : Array<{ 
        id: number;
        name: string;
        description: string;
        image: string;
     }>;
    

}