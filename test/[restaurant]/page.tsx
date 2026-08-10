import { createClient } from '@supabase/supabase-js';
import DashboardLayout from '@/components/restaurant/DashboardLayout';
import RestaurantHeader from '@/components/restaurant/RestaurantHeader';
import RestaurantAbout from '@/components/restaurant/RestaurantAbout';
import RestaurantGallery from '@/components/restaurant/RestaurantGallery';
import RestaurantMenu from '@/components/restaurant/RestaurantMenu';
import RestaurantHours from '@/components/restaurant/RestaurantHours';
import RestaurantContact from '@/components/restaurant/RestaurantContact';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const revalidate = 60; // Revalidate every minute

export default async function RestaurantPage({ params }: { params: Promise<{ restaurant: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.restaurant;

  let name = 'TableKard Gourmet Bistro';
  let email = 'contact@partner-restaurant.com';
  let phone = '+91 98765 43210';
  let address = '123 Food Street, Culinary Zone, Bangalore, KA, 560001';

  const { data: restaurantData, error } = await supabase
    .from('restaurants')
    .select('id, name, contact_email, contact_phone, contact_address')
    .eq('slug', slug)
    .limit(1);

  const restaurant = restaurantData && restaurantData.length > 0 ? restaurantData[0] : null;
  if (error || !restaurant) {
    // Optionally return notFound() here if you want strict 404s for unknown restaurants
  } else {
    name = restaurant.name || name;
    email = restaurant.contact_email || email;
    phone = restaurant.contact_phone || phone;
    address = restaurant.contact_address || address;
  }

  let menuItems: any[] = [];
  if (restaurant && restaurant.id) {
    const { data: itemsData, error: itemsError } = await supabase
      .from('menu_items')
      .select(`
        id,
        name,
        short_description,
        price,
        menu_categories!inner ( name ),
        menu_item_images ( image_url )
      `)
      .eq('restaurant_id', restaurant.id)
      .eq('is_available', true);

    if (!itemsError && itemsData) {
      menuItems = itemsData.map((item: any) => ({
        id: item.id,
        name: item.name,
        desc: item.short_description || '',
        price: `₹${item.price}`,
        category: item.menu_categories?.name || 'Uncategorized',
        img: (item.menu_item_images && item.menu_item_images.length > 0) 
             ? item.menu_item_images[0].image_url 
             : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80',
      }));
    }
  }

  return (
    <>
      <link rel="stylesheet" href="/css/restaurant-style.css" />
      <RestaurantHeader restaurantName={name} />
      <DashboardLayout restaurantName={name}>
        <div>
          {/* <RestaurantAbout /> */}
          <RestaurantMenu initialItems={menuItems} restaurantName={name} />
          {/* <RestaurantGallery /> */}
          <RestaurantHours />
          <RestaurantContact address={address} email={email} phone={phone} />
        </div>
      </DashboardLayout>
    </>
  );
}
