// services/authService.ts
export const loginUser = async (credentials: { username: string; password: string }) => {
    const response = await fetch('http://localhost:5000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
  
    if (!response.ok) {
      throw new Error('Belépési hiba');
    }
  
    return await response.json();
  };
  // services/userService.ts
  export const logout = () => {
    localStorage.removeItem('token'); // Töröljük a token-t a localStorage-ból
  };
  
export const changePassword = async (oldPassword: string, newPassword: string) => {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:5000/user/login', {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      oldPassword,
      password: newPassword,
    }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token');
      throw new Error('Token lejárt vagy érvénytelen. Jelentkezz be újra!');
    }
    if (response.status === 409) {
      throw new Error('A régi és az új jelszó nem egyezhet meg.');
    }
    throw new Error('A jelszó módosítása sikertelen.');
  }

  return await response.json();
};

  export const registerUser = async (userData: object) => {
    const response = await fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  
    if (!response.ok) {
      throw new Error('Regisztráció sikertelen!');
    }
  
    return await response.json();
  };

  export const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/products/categories', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  };
  // services/authService.ts
export const logoutUser = () => {
  localStorage.removeItem('token');
};

  const updateProfile = async (profileData: object) => {
    try {
      const response = await fetch('http://localhost:5000/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(profileData),
      });
  
      if (!response.ok) {
        throw new Error('Profil frissítése sikertelen!');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  export const cancelOrder = async (orderId: string, reason: string) => {
    const response = await fetch(`http://localhost:5000/orders/${orderId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ reason }),
    });
  
    if (!response.ok) {
      throw new Error('Nem sikerült visszamondani a megrendelést.');
    }
  
    return await response.json();
  };
  // services/authService.ts
export const fetchUserProfile = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:5000/user', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token');
      throw new Error('Hozzáférés megtagadva, jelentkezz be újra!');
    }
    throw new Error('Nem sikerült betölteni a felhasználói adatokat.');
  }

  return await response.json();
};
export const fetchProductsByCategory = async (
  categoryId: string,
  orderBy: string = 'name.ASC',
  offset: number = 0,
  limit: number = 6
) => {
  const response = await fetch(
    `http://localhost:5000/products?categories=${categoryId}&orderBy=${orderBy}&offset=${offset}&limit=${limit}`,
    {
      method: 'GET',
    }
  );

  if (!response.ok) {
    throw new Error('Nem sikerült lekérni a termékeket.');
  }

  return await response.json();
};
// services/productService.ts

export const fetchProductDetails = async (productId: string) => {
  const response = await fetch(`http://localhost:5000/products/${productId}`, {
    method: 'GET',
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('A keresett termék nem található.');
    }
    throw new Error('Nem sikerült lekérni a termék adatait.');
  }

  return await response.json();
};
export const fetchCartProducts = async (productIds: string[]) => {
  const query = productIds.map((id) => `id=${id}`).join('&');
  const response = await fetch(`http://localhost:5000/products/list?${query}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Nem sikerült lekérni a kosár tartalmát.');
  }

  return await response.json();
};
// services/orderService.ts

export const fetchOrderDetails = async (orderId: string) => {
  const response = await fetch(`http://localhost:5000/orders/${orderId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Ha szükséges token
    },
  });

  if (!response.ok) {
    throw new Error('Nem sikerült lekérni a megrendelés részleteit.');
  }

  return await response.json();
};
// services/orderService.ts

export const fetchOrderStatus = async (orderId: string) => {
  const response = await fetch(`http://localhost:5000/orders/${orderId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    throw new Error('Nem sikerült lekérni a megrendelés státuszát.');
  }

  return await response.json();
};
