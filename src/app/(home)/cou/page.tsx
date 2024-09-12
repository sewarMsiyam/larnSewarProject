"use client";
import React, { useEffect, useState } from 'react';
import { fetchAll } from '@/app/api/dataFetch';
// import { Review } from '@/app/api/interfaces';

export interface Review {
  id: number;
  customer_img: string | null;
  rating: number;
  comment: string;
  customer_name: string;
  customer_position: string;
}

// مكون عرض المراجعات
const ReviewsComponent: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]); // تأكد من أن المصفوفة فارغة في البداية
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
  const fetchData = async () => {
    const reviewsData = await fetchAll('reviews');
    console.log('Fetched reviews data:', reviewsData); // عرض البيانات في الكونسول
    if (reviewsData && Array.isArray(reviewsData)) {
      setReviews(reviewsData);
    }
    setLoading(false);
  };

  fetchData();
}, []);


  if (loading) {
    return <div>جاري تحميل المراجعات...</div>;
  }

  if (!reviews.length) {
    return <div>لا توجد مراجعات لعرضها.</div>;
  }

  return (
    <div>
      <h2>المراجعات</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id} style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}>
            <div>
              <strong>الاسم:</strong> {review.customer_name}
            </div>
            <div>
              <strong>المنصب:</strong> {review.customer_position}
            </div>
            <div>
              <strong>التقييم:</strong> {review.rating} / 5
            </div>
            <div>
              <strong>التعليق:</strong> {review.comment}
            </div>
            {review.customer_img && (
              <div>
                <img src={review.customer_img} alt={review.customer_name} style={{ width: '50px', height: '50px' }} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewsComponent;
