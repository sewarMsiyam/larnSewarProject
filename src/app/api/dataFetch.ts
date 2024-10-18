const BASE_URL = 'https://sewaar.net/api/v1';

const buildUrl = (endpoint: string, mainCategory?: string, id?: string) => {
  return mainCategory
    ? id
      ? `${BASE_URL}/${mainCategory}/${endpoint}/${id}`
      : `${BASE_URL}/${mainCategory}/${endpoint}`
    : id
      ? `${BASE_URL}/${endpoint}/${id}`
      : `${BASE_URL}/${endpoint}`;
};

type FetchOptionsBase = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: HeadersInit;
  timeout?: number;
};

type FetchOptionsWithBody<T> = FetchOptionsBase & {
  method: "POST" | "PUT";
  body: T;
};

type FetchOptionsWithoutBody = FetchOptionsBase & {
  method?: "GET" | "DELETE";
  body?: never;
};

type FetchOptions<T> = FetchOptionsWithBody<T> | FetchOptionsWithoutBody;

type SHCRequestInit = Omit<RequestInit, "body"> & {
  body?: BodyInit | null;
  timeout?: number;
};

class FetchError extends Error {
  public status: number;
  public statusText: string;

  constructor(status: number, statusText: string, message: string, cause?: Error) {
    super(message, { cause });
    this.name = "FetchError";
    this.status = status;
    this.statusText = statusText;
  }
}

const HEADERS_DEFAULT: Record<string, string> = { "Content-Type": "application/json" };

const ERRORS_DETAILS: Record<
  number | "maximumRetries" | "network" | "unknown",
  { status: number; statusText: string; message: string }
> = {
  400: {
    status: 400,
    statusText: "BAD_REQUEST",
    message: "تأكد من ادخال جميع الداتا المطلوبة "
  },
  401: {
    status: 401,
    statusText: "NOT_AUTHORIZED",
    message: "You are not authorized to access this resource."
  },
  403: {
    status: 403,
    statusText: "FORBIDDEN",
    message: "Access to this resource is forbidden."
  },
  404: {
    status: 404,
    statusText: "NOT_FOUND",
    message: "The requested resource could not be found."
  },
  408: {
    status: 408,
    statusText: "REQUEST_TIMEOUT",
    message: "The request timed out. Please try again."
  },
  500: {
    status: 500,
    statusText: "INTERNAL_SERVER_ERROR",
    message: "There was an error on our server. Please try again later."
  },
  maximumRetries: {
    status: 408,
    statusText: "MAXIMUM_RETRIES",
    message: "Maximum retries reached. Please try again."
  },
  network: {
    status: 0,
    statusText: "NETWORK",
    message: "A network error occurred. Please check your connection and try again."
  },
  unknown: {
    status: 0,
    statusText: "UNKNOWN_ERROR",
    message: "An unknown or unexpected error occurred. Please try again."
  }
};

const errorHandler = function errorHandler(
  type: number | "maximumRetries" | "network" | "unknown",
  statusText?: string,
  message?: string,
  cause?: Error
): never {
  const {
    status: errorStatus,
    statusText: statusTextDefault,
    message: messageDefault
  } = ERRORS_DETAILS[type] || ERRORS_DETAILS.unknown;
  const errorStatusText = statusText || statusTextDefault;
  const errorMessage = message || messageDefault;
  const fetchError = new FetchError(errorStatus, errorStatusText, errorMessage, cause);
  console.error(`${type}:${errorMessage}`, fetchError);
  throw fetchError;
};

const fetchWithTimeout = function fetchWithTimeout(
  url: string,
  options: SHCRequestInit
): Promise<Response> {
  const { timeout = 8000, ...optionsRest } = options;

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      const { statusText, message } = ERRORS_DETAILS[408];
      reject(new FetchError(408, statusText, message));
    }, timeout);

    fetch(url, optionsRest)
      .then((response) => {
        clearTimeout(timer);
        resolve(response);
      })
      .catch((error) => {
        clearTimeout(timer);
        const { statusText, message } =
          error instanceof TypeError ? ERRORS_DETAILS.network : ERRORS_DETAILS.unknown;
        reject(new FetchError(0, statusText, message, error));
      });
  });
};

const fetchRetry = async function fetchRetry(
  url: string,
  options: SHCRequestInit,
  maximumRetries: number = 3
): Promise<Response> {
  try {
    const response = await fetchWithTimeout(url, options);
    if (!response.ok) errorHandler(response.status as number);
    return response;
  } catch (error) {
    if (error instanceof FetchError && error.status === 408 && maximumRetries > 1)
      return fetchRetry(url, options, maximumRetries - 1);

    if (error instanceof FetchError) {
      if (maximumRetries <= 1)
        return errorHandler("maximumRetries", error.statusText, error.message, error);
      return errorHandler(error.status as number, error.statusText, error.message, error);
    }

    return errorHandler("unknown");
  }
};

export async function fetchAll<T>(endpoint: string, mainCategory?: string) {
  try {
    const response = await fetchRetry(buildUrl(endpoint, mainCategory), {
      headers: {
        'Accept-Language': 'ar',
      },
      timeout: 8000,
    });
    const result = await response.json();
    if (result.item) {
      if (Array.isArray(result.item)) {
        return result.item as T[];
      } else if (result.item[endpoint]) {
        return result.item[endpoint] as T[];
      }
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export async function fetchOne(endpoint: string, id: string, mainCategory?: string) {
  try {
    const response = await fetchRetry(buildUrl(endpoint, mainCategory, id), {
      headers: {
        'Accept-Language': 'ar',
      },
      timeout: 8000,
    });
    const result = await response.json();
    return result.item ? result.item : null;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export async function fetchOneToken(endpoint: string, id: string, token: string, mainCategory?: string) {
  console.log("رابط ال api " + buildUrl(endpoint, mainCategory, id));

  try {
    const response = await fetchRetry(buildUrl(endpoint, mainCategory, id), {
      headers: {
        'Accept-Language': 'ar',
        'Authorization': `Bearer ${token}`,
      },
      timeout: 8000,
    });

    if (!response.ok) {
      console.error('Failed to fetch data:', response.status, response.statusText);
      return null;
    }

    const result = await response.json();
    return result.item ? result.item : null;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}


export async function postData(endpoint: string, data: any, mainCategory?: string) {
  try {
    const response = await fetchRetry(buildUrl(endpoint, mainCategory), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'ar',
      },
      body: JSON.stringify(data),
      timeout: 8000,
    });
    return await response.json();
  } catch (error) {
    console.error('Failed to post data:', error);
    return null;
  }
}


export async function fetchAllToken(endpoint: string, token: string, mainCategory?: string) {
  console.log(buildUrl(endpoint, mainCategory));
  try {
    const response = await fetchRetry(buildUrl(endpoint, mainCategory), {
      headers: {
        'Accept-Language': 'ar',
        'Authorization': `Bearer ${token}`,
      },
      timeout: 8000,
    });
    const result = await response.json();
    if (result.status === 200) {
      let data = [];

      if (result.item) {
        if (Array.isArray(result.item)) {
          data = result.item;
        } else if (result.item[endpoint]) {
          data = result.item[endpoint];
        }
      }

      return data;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}


export async function updateProfile(endpoint: string, token?: string, data?: any, mainCategory?: string) {
  console.log(data);
  try {
    const response = await fetchRetry(buildUrl(endpoint, mainCategory), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'ar',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      timeout: 8000,
    });
    console.log(response);

    const result = await response.json();
    console.log(result);

    if (response.ok) {
      return result;
    } else {
      throw new Error(result.message || 'Failed to update profile');
    }
  } catch (error) {
    console.error('Failed to update profile:', error);
    throw error;
  }
}


export async function fetchProfileData(endpoint: string, token: string | null) {
  try {
    const response = await fetchRetry(buildUrl(endpoint), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'ar',
        'Authorization': `Bearer ${token}`,
      },
      timeout: 8000,
    });

    if (!response.ok) {
      const errorData = await response.json();

      if (errorData.message) {
        throw new Error(errorData.message);
      }

      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch profile data:', error);
    return null;
  }
}



export async function CreateCourseFun(endpoint: string, token?: string, data?: FormData, mainCategory?: string) {
  console.log(buildUrl(endpoint, mainCategory));
  try {
    const response = await fetchRetry(buildUrl(endpoint, mainCategory), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Accept-Language': 'ar',
        'Authorization': `Bearer ${token}`,
      },
      body: data,
      timeout: 8000,
    });

    const responseText = await response.text();
    console.log(responseText);

    console.log('Full server response:', responseText);

    let result;
    console.log(`function  = ${result}`);
    try {
      result = JSON.parse(responseText);
    } catch (e) {
      throw new Error('Invalid server response');
    }

    if (!response.ok) {
      throw new Error(result.message || 'Failed to create course');
    }

    if (result.status === true) {
      return result;
    } else {
      throw new Error(result.message || 'Failed to create course');
    }
  } catch (error) {
    console.error('Failed to create course:', error);
    throw error;
  }
}

export async function fetchOneTokenUpdateCourse(endpoint: string, id: string, token: string, mainCategory?: string) {
  console.log(buildUrl(endpoint, mainCategory, id.toString()));
  try {
    const response = await fetchRetry(buildUrl(endpoint, mainCategory, id.toString()), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'ar',
        'Authorization': `Bearer ${token}`,
      },
      timeout: 8000,
    });
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
    //  return result.item ? result.item : null;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return null;
  }
}


export async function updateProfileS(endpoint: string, token?: string, data?: any, mainCategory?: string) {
  console.log(data);
  try {
    const response = await fetchRetry(buildUrl(endpoint, mainCategory), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'ar',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      timeout: 8000,
    });

    const result = await response.json();
    console.log('Server response:', result);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}, message: ${result.message || 'Unknown error'}`);
    }

    if (result.status === true && result.item) {
      console.log('Profile updated successfully. New data:', result.item);
      return result;
    } else {
      throw new Error(result.message || 'Failed to update profile');
    }
  } catch (error) {
    console.error('Failed to update profile:', error);
    throw error; // Re-throw the error so the caller can handle it
  }
}







export async function CreatHeuerFun(endpoint: string, token?: string, data?: FormData, mainCategory?: string) {
  console.log(buildUrl(endpoint, mainCategory));
  try {
    const response = await fetchRetry(buildUrl(endpoint, mainCategory), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Accept-Language': 'ar',
        'Authorization': `Bearer ${token}`,
      },
      body: data,
      timeout: 8000,
    });
    if (!response.ok) {
      throw new Error(await response.text()|| 'Failed to create course');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to create course:', error);
    throw error;
  }
}



export async function deleteOneToken(endpoint: string, id: number, token: string, mainCategory?: string) {
  try {
    const response = await fetchRetry(buildUrl(endpoint, mainCategory, id.toString()), {
      method: 'DELETE',
      headers: {
        'Accept-Language': 'ar',
        'Authorization': `Bearer ${token}`,
      },
      timeout: 8000,
    });

    if (!response.ok) {
      console.error('Failed to delete:', response.status, response.statusText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    console.log('Delete result:', result);
    return result.item ?? null;
  } catch (error) {
    console.error('Error during delete operation:', error);
    throw error;
  }
}




