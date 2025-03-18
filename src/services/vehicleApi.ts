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
    // Format registration to remove spaces for API call
    const formattedReg = registration.replace(/\s+/g, '').toUpperCase();
    
    // Configure API endpoint - using correct endpoint
    const url = new URL('https://api.vehicle-search.co.uk/api/v1/valuation');
    url.searchParams.append('registration', formattedReg);
    if (mileage) url.searchParams.append('mileage', mileage.toString());
    
    console.log(`Fetching vehicle data for ${formattedReg}...`);
    
    // Make the API call with proper headers
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    // Handle non-200 responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || `API returned status ${response.status}`;
      console.error('API error:', errorMessage);
      throw new Error(errorMessage);
    }
    
    // Parse successful response
    const data = await response.json();
    console.log('Vehicle data received:', data);
    
    // Return formatted response
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
    
    // No condition for falling back to simulation in production
    // We always want to use the real API
    
    // Return proper error
    return {
      success: false,
      error: error instanceof Error 
        ? error.message 
        : 'Unable to connect to the vehicle valuation service. Please check your API key and internet connection.'
    };
  }
};

// Note: This simulation function is kept for reference but we no longer use it
// in the main flow unless explicitly called
const simulateVehicleValuation = (
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
      
      // Generate different vehicle data based on the registration input
      const regLastDigit = registration.match(/\d/) ? parseInt(registration.match(/\d/)![0]) : 0;
      
      const vehicles = [
        {
          make: 'BMW',
          model: '3 Series 320d M Sport',
          year: 2020,
          retailValue: 23750,
          tradeValue: 21250,
          privateValue: 22500,
        },
        {
          make: 'Audi',
          model: 'A4 2.0 TDI S Line',
          year: 2019,
          retailValue: 22450,
          tradeValue: 19800,
          privateValue: 21200,
        },
        {
          make: 'Mercedes',
          model: 'C-Class C220d AMG Line',
          year: 2021,
          retailValue: 28950,
          tradeValue: 25500,
          privateValue: 27200,
        },
        {
          make: 'Volkswagen',
          model: 'Golf GTI',
          year: 2022,
          retailValue: 30750,
          tradeValue: 27800,
          privateValue: 29300,
        },
        {
          make: 'Ford',
          model: 'Focus ST',
          year: 2020,
          retailValue: 19950,
          tradeValue: 17500,
          privateValue: 18800,
        },
        {
          make: 'Toyota',
          model: 'Corolla Hybrid Excel',
          year: 2021,
          retailValue: 24800,
          tradeValue: 22100,
          privateValue: 23500,
        },
        {
          make: 'Vauxhall',
          model: 'Astra SRi Nav',
          year: 2019,
          retailValue: 16250,
          tradeValue: 14300,
          privateValue: 15450,
        },
        {
          make: 'Nissan',
          model: 'Qashqai Tekna',
          year: 2021,
          retailValue: 25900,
          tradeValue: 23200,
          privateValue: 24650,
        },
        {
          make: 'Honda',
          model: 'Civic Type R',
          year: 2020,
          retailValue: 29950,
          tradeValue: 27100,
          privateValue: 28500,
        },
        {
          make: 'Hyundai',
          model: 'i30N Performance',
          year: 2022,
          retailValue: 27500,
          tradeValue: 24750,
          privateValue: 26100,
        }
      ];
      
      // Select vehicle based on registration to give different results
      const vehicleIndex = regLastDigit % vehicles.length;
      const vehicle = vehicles[vehicleIndex];
      
      resolve({
        success: true,
        data: {
          registration: registration,
          make: vehicle.make,
          model: vehicle.model,
          year: vehicle.year,
          retailValue: vehicle.retailValue,
          tradeValue: vehicle.tradeValue,
          privateValue: vehicle.privateValue,
          mileage: mileage || Math.floor(Math.random() * 35000) + 15000 // Random mileage between 15k-50k
        }
      });
    }, 1500);
  });
};
