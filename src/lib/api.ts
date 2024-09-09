export async function registerStudent(studentData: any) {
    try {
      const response = await fetch('https://sewaar.net/api/v1/students/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'فشل في التسجيل');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error registering student:', error);
      throw error;
    }
  }
  