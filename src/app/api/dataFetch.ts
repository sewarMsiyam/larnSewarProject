// app/api/api.ts

const BASE_URL = 'https://sewaar.net/api/v1';

// دالة لإنشاء URL بناءً على المعاملات
const buildUrl = (endpoint: string, mainCategory?: string, id?: string) => {
  return mainCategory
    ? id
      ? `${BASE_URL}/${mainCategory}/${endpoint}/${id}`
      : `${BASE_URL}/${mainCategory}/${endpoint}`
    : id
    ? `${BASE_URL}/${endpoint}/${id}`
    : `${BASE_URL}/${endpoint}`;
};

// دالة لجلب جميع البيانات
export async function fetchAll(endpoint: string, mainCategory?: string) {
  try {
    const response = await fetch(buildUrl(endpoint, mainCategory));
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    return result.item ? result.item[endpoint] : []; // استخراج البيانات بناءً على مفتاح `item`
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return [];
  }
}

// دالة لجلب بيانات محددة
export async function fetchOne(endpoint: string, id: string, mainCategory?: string) {
  try {
    const response = await fetch(buildUrl(endpoint, mainCategory, id));
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    return result.item ? result.item : null; // استخراج البيانات بناءً على مفتاح `item`
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return null;
  }
}


// دالة لإرسال بيانات جديدة (POST)
export async function postData(endpoint: string, data: any, mainCategory?: string) {
  try {
    const response = await fetch(buildUrl(endpoint, mainCategory), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to post data:', error);
    return null;
  }
}

// دالة لتحديث بيانات محددة (PUT)
export async function updateData(endpoint: string, id: string, data: any, mainCategory?: string) {
  try {
    const response = await fetch(buildUrl(endpoint, mainCategory, id), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to update data:', error);
    return null;
  }
}

// دالة لحذف بيانات محددة (DELETE)
export async function deleteData(endpoint: string, id: string, mainCategory?: string) {
  try {
    const response = await fetch(buildUrl(endpoint, mainCategory, id), {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to delete data:', error);
    return null;
  }
}
