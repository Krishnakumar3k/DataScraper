const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const allCompanies = {
  Noida: [
    { company_name: "Digital Marketing Pro India", phone_number: "+91 98765 43210", address: "Sector 62, Noida, Uttar Pradesh 201301, India" },
    { company_name: "Web Marketing Experts", phone_number: "+91 87654 32109", address: "Sector 18, Noida, Uttar Pradesh 201301, India" },
    { company_name: "Content Marketing Hub", phone_number: "+91 65432 10987", address: "Sector 16, Noida, Uttar Pradesh 201301, India" },
    { company_name: "AdTech Solutions India", phone_number: "+91 43210 98765", address: "Sector 63, Noida, Uttar Pradesh 201301, India" },
    { company_name: "Brand Digital Agency Noida", phone_number: "+91 91234 56789", address: "Sector 50, Noida, Uttar Pradesh 201301, India" },
  ],
  Delhi: [
    { company_name: "Creative Digital Solutions", phone_number: "+91 99887 76543", address: "Connaught Place, New Delhi 110001, India" },
    { company_name: "Social Media Agency India", phone_number: "+91 76543 21098", address: "Nehru Place, New Delhi 110019, India" },
    { company_name: "Brand Builders Digital", phone_number: "+91 54321 09876", address: "Rajouri Garden, New Delhi 110027, India" },
    { company_name: "Growth Marketing Partners", phone_number: "+91 32109 87654", address: "Lajpat Nagar, New Delhi 110024, India" },
    { company_name: "Delhi Marketing Solutions", phone_number: "+91 88765 54321", address: "Greater Kailash, New Delhi 110048, India" },
  ],
  Dubai: [
    { company_name: "SEO Masters Dubai", phone_number: "+971 4 123 4567", address: "Business Bay, Dubai, UAE" },
    { company_name: "Performance Marketing LLC", phone_number: "+971 4 234 5678", address: "Dubai Internet City, Dubai, UAE" },
    { company_name: "Emirates Digital Agency", phone_number: "+971 4 345 6789", address: "Downtown Dubai, Dubai, UAE" },
    { company_name: "Gulf Marketing Experts", phone_number: "+971 4 456 7890", address: "DIFC, Dubai, UAE" },
    { company_name: "Dubai SEO Company", phone_number: "+971 4 567 8901", address: "JBR, Dubai, UAE" },
  ],
  India: [
    { company_name: "Digital Marketing Pro India", phone_number: "+91 98765 43210", address: "Sector 62, Noida, Uttar Pradesh 201301, India" },
    { company_name: "Creative Digital Solutions", phone_number: "+91 99887 76543", address: "Connaught Place, New Delhi 110001, India" },
    { company_name: "Web Marketing Experts", phone_number: "+91 87654 32109", address: "Sector 18, Noida, Uttar Pradesh 201301, India" },
    { company_name: "Social Media Agency India", phone_number: "+91 76543 21098", address: "Nehru Place, New Delhi 110019, India" },
    { company_name: "Content Marketing Hub", phone_number: "+91 65432 10987", address: "Sector 16, Noida, Uttar Pradesh 201301, India" },
  ],
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { searchText } = await req.json();

    let extractedLocation = 'India';
    const locationKeys = Object.keys(allCompanies);

    for (const location of locationKeys) {
      if (searchText.toLowerCase().includes(location.toLowerCase())) {
        extractedLocation = location;
        break;
      }
    }

    const companies = allCompanies[extractedLocation] || allCompanies['India'];

    const resultsWithMetadata = companies.map(company => ({
      ...company,
      search_query: searchText,
      location: extractedLocation,
    }));

    return new Response(
      JSON.stringify({
        success: true,
        data: resultsWithMetadata,
        location: extractedLocation,
        message: `Found ${resultsWithMetadata.length} companies in ${extractedLocation}`,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
