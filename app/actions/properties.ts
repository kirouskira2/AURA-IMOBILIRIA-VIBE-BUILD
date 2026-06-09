"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "") + "-" + Date.now();
}

export async function createProperty(formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const city = formData.get("city") as string;
  const neighborhood = formData.get("neighborhood") as string;
  const bedrooms = parseInt(formData.get("bedrooms") as string) || 0;
  const bathrooms = parseInt(formData.get("bathrooms") as string) || 0;
  const parking_spots = parseInt(formData.get("parking_spots") as string) || 0;
  const area_sqm = parseFloat(formData.get("area_sqm") as string) || 0;
  const status = formData.get("status") as string;
  const coverImage = formData.get("cover_image") as string;

  const slug = generateSlug(title);

  const { data: property, error } = await supabase
    .from("properties")
    .insert({
      title,
      slug,
      description,
      price,
      city,
      neighborhood,
      bedrooms,
      bathrooms,
      parking_spots,
      area_sqm,
      status,
    })
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  if (property && coverImage) {
    const { error: imageError } = await supabase
      .from("property_images")
      .insert({
        property_id: property.id,
        url: coverImage,
        is_cover: true,
      });
      
    if (imageError) {
      console.error("Error saving image:", imageError);
    }
  }

  revalidatePath("/", "layout");
  redirect("/admin/properties");
}

export async function updateProperty(id: string, formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const city = formData.get("city") as string;
  const neighborhood = formData.get("neighborhood") as string;
  const bedrooms = parseInt(formData.get("bedrooms") as string) || 0;
  const bathrooms = parseInt(formData.get("bathrooms") as string) || 0;
  const parking_spots = parseInt(formData.get("parking_spots") as string) || 0;
  const area_sqm = parseFloat(formData.get("area_sqm") as string) || 0;
  const status = formData.get("status") as string;
  const coverImage = formData.get("cover_image") as string;

  const { error } = await supabase
    .from("properties")
    .update({
      title,
      description,
      price,
      city,
      neighborhood,
      bedrooms,
      bathrooms,
      parking_spots,
      area_sqm,
      status,
      updated_at: new Date().toISOString()
    })
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  // Handle image update (simplified: if coverImage is provided, delete old cover and insert new)
  if (coverImage) {
    // Check if the current cover image is the same
    const { data: currentImages } = await supabase
      .from("property_images")
      .select("*")
      .eq("property_id", id)
      .eq("is_cover", true);

    const hasSameImage = currentImages?.some(img => img.url === coverImage);

    if (!hasSameImage) {
      // Remove old cover
      await supabase.from("property_images").delete().eq("property_id", id).eq("is_cover", true);
      // Insert new cover
      await supabase.from("property_images").insert({
        property_id: id,
        url: coverImage,
        is_cover: true,
      });
    }
  }

  revalidatePath("/", "layout");
  redirect("/admin/properties");
}

export async function deleteProperty(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("properties")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  revalidatePath("/", "layout");
}
