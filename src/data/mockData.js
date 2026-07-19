// This file no longer stores data directly.
// All content now lives in separate JSON files under src/data/json/ —
// one file per section, so you can edit/replace content without touching any code.
// Update images by dropping files into public/images/... using the same file names
// referenced in the JSON (see README-DATA.md for the full guide).

import profileData from './json/profile.json';
import skillsData from './json/skills.json';
import timelineData from './json/timeline.json';
import projectsData from './json/projects.json';
import blogsData from './json/blogs.json';
import testimonialsData from './json/testimonials.json';

export const profile = profileData;
export const skills = skillsData.skills;
export const stats = skillsData.stats;
export const timeline = timelineData;
export const projectCategories = projectsData.categories;
export const projects = projectsData.items;
export const blogCategories = blogsData.categories;
export const blogs = blogsData.items;
export const testimonials = testimonialsData;
