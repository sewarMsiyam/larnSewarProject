"use client";
import { useEffect, useState } from 'react';
import { Privacy } from '@/app/api/interfaces';
import { fetchOneP } from '@/app/api/dataFetch';
import { Skeleton } from "@/components/ui/skeleton";
import Breadcrumb from "@/components/ui/breadcrumbHome"
import TitleSection from '@/components/title';

export default function PrivacyReg() {
  const [privacyData, setPrivacyData] = useState<Privacy | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const breadcrumbs = [
    { label: 'الرئيسية', href: '/' },
    { label: 'سياسة الخصوصية', href: '/privacy-policy', isActive: true }
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        let endpoint = 'privacy_policy';

        const data = await fetchOneP(endpoint);
        console.log(data);
        if (data) {
          setPrivacyData(data);
        }
      } catch (error) {
        console.error('Error fetching terms:', error);
        setError('An error occurred while fetching terms and conditions.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <Breadcrumb breadcrumbs={breadcrumbs} />
        <section className='container my-10'>
          <TitleSection text="سياسة الخصوصية " />
        </section>
      </>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!privacyData) {
    return <p className="text-yellow-500">No privacy policy data available</p>;
  }

  return (
    <>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <section className='container my-10'>
        <TitleSection text="سياسة الخصوصية " />
        <div className='container'>
          {privacyData?.content}
        </div>
      </section>
    </>
  );
}