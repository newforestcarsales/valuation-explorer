
// This is a service to interact with the Vehicle Search API

interface VehicleValuationRequest {
  registration: string;
  mileage?: number;
  apiKey: string;
}

interface VehicleValuationResponse {
  success: boolean;
  data?: {
    registration: string;
    make: string;
    model: string;
    year: number;
    retailValue: number;
    tradeValue: number;
    privateValue: number;
    mileage?: number;
  };
  error?: string;
}

export const fetchVehicleValuation = async ({
  registration,
  mileage,
  apiKey
}: VehicleValuationRequest): Promise<VehicleValuationResponse> => {
  try {
    // NOTE: This is a mock implementation since the actual API endpoint details aren't provided
    // In a real implementation, you would make an actual API call here
    
    const url = new URL('https://api.vehicle-search.co.uk/api/v1/valuation');
    url.searchParams.append('registration', registration);
    if (mileage) url.searchParams.append('mileage', mileage.toString());
    
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.message || 'Failed to fetch vehicle data'
      };
    }
    
    const data = await response.json();
    return {
      success: true,
      data: {
        registration: data.registration,
        make: data.make,
        model: data.model,
        year: data.year,
        retailValue: data.valuations.retail,
        tradeValue: data.valuations.trade,
        privateValue: data.valuations.private,
        mileage: data.mileage
      }
    };
  } catch (error) {
    console.error('API error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
};

// For demonstration purposes, this function simulates an API response
export const simulateVehicleValuation = (
  registration: string,
  mileage?: number
): Promise<VehicleValuationResponse> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      // Sample response data
      if (registration.trim() === '') {
        resolve({
          success: false,
          error: 'Registration is required'
        });
        return;
      }
      
      resolve({
        success: true,
        data: {
          registration: registration,
          make: 'BMW',
          model: '3 Series 320d M Sport',
          year: 2020,
          retailValue: 23750,
          tradeValue: 21250,
          privateValue: 22500,
          mileage: mileage || 25000
        }
      });
    }, 1500);
  });
};
