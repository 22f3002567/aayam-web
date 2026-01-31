// // src/types/schema.ts

// export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

// // 1. THE HUMAN (Member)
// export interface TeamMember {
//   id: string;
//   name: string;
//   slug: string;
//   image_url: string | null;
//   role_student: string; // From the 'tenures' join
//   department: string;   // From the 'tenures' join
//   bio: string | null;
//   social_links: Json | null;
// }

// // 2. THE ART (Play)
// export interface Play {
//   id: string;
//   title: string;
//   slug: string;
//   poster_url: string | null;
//   youtube_id: string;
//   mood: 'drama' | 'thriller' | 'comedy' | 'horror' | 'experimental';
//   release_date: string;
//   description: string | null;
//   tags: string[] | null;
// }

// // 3. THE EVENT (Live)
// export interface Event {
//   id: string;
//   title: string;
//   date: string;
//   type: 'production' | 'workshop' | 'spotlight';
//   poster_url: string | null;
//   is_upcoming: boolean;
// }


// // src/types/schema.ts

// src/types/schema.ts

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

// NEW: Strict Category Definition for Filtering
export type PlayCategory = 'stage' | 'street' | 'film' | 'short' | 'workshop';

// 1. THE HUMAN (Member)
export interface TeamMember {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  role_student: string; // From the 'tenures' join
  department: string;   // From the 'tenures' join
  bio: string | null;
  social_links: Json | null;
}

// 2. THE ART (Play)
export interface Play {
  id: string;
  title: string;
  slug: string;
  poster_url: string | null;
  youtube_id: string;
  
  // Existing fields
  mood: 'drama' | 'thriller' | 'comedy' | 'horror' | 'experimental'; // Maps to Navrasa color
  release_date: string;
  description: string | null;
  tags: string[] | null;

  // --- NEW FIELDS FOR PHASE 4.5 ---
  category: PlayCategory; // Determines which Tab it appears in
  featured_score: number; // Higher number = Appears first (Curator Mode)
}

// 3. THE EVENT (Live)
export interface Event {
  id: string;
  title: string;
  date: string;
  type: 'production' | 'workshop' | 'spotlight';
  poster_url: string | null;
  is_upcoming: boolean;
}

// src/types/schema.ts

// ... (Existing types)

// THE TIME MACHINE
export type AcademicYear = '2025-26' | '2024-25' | '2023-24' | '2022-23';

// // THE HIERARCHY (Gravity)
// export type MemberRank = 
//   | 'ZENITH'  // Faculty / Mentors
//   | 'CROWN'   // Secretary / Joint Secretary
//   | 'ORBIT'   // Heads / Leads
//   | 'CLOUD';  // Core Members / Executives


// export type Department = 'acting' | 'scripting' | 'direction' | 'tech' | 'design' | 'management';

// // THE ENSEMBLE MEMBER (Joined Data)
// export interface EnsembleMember {
//   id: string;
//   name: string;
//   slug: string;
//   image_url: string | null;
//   bio: string | null;
  
//   // Tenure Specifics
//   year: AcademicYear;
//   role: string;         // Display Name: "Secretary", "Creative Head"
//   rank: MemberRank;     // Logic Name: CROWN, ORBIT
//   department?: string;  // "Tech", "Acting", "Scripting"
  
//   social_links: Json | null;
// }
// src/types/schema.ts

// src/types/schema.ts

// src/types/schema.ts
// src/types/schema.ts

// src/types/schema.ts
export type MemberRank = 'ZENITH' | 'CROWN' | 'ORBIT' | 'CLOUD';
export type Department = 'acting' | 'scripting' | 'direction' | 'tech' | 'design' | 'management' | 'production';

export interface EnsembleMember {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  bio: string | null;
  year: string;
  role: string;       
  rank: MemberRank;   
  // department: Department;
  department?: string;
  color?: string;
  
  // Ensure these are present
  highlight_video_id?: string;
  audio_url?: string | null;
  social_links: any | null;
  email?: string | null;
}

// Example Data Structure
const CAST_LIST = [
  { 
    id: '1', name: 'Siddharth', role: 'Secretary', 
    color: '#eab308', // Gold (Veera/Heroism) - DEFAULT
    // ... 
  },
  { 
    id: '2', name: 'Vaishanvi Srivastav', role: 'Deputie Secretary', 
    color: '#ec4899', // Pink (Shringara/Love)
    // ... 
  },
  { 
    id: '3', name: 'Harsh Aryan', role: 'PR', 
    color: '#06b6d4', // Cyan (Adbhuta/Wonder)
    // ... 
  },
  { 
    id: '4', name: 'Chirag', role: 'Core Member', 
    color: '#ef4444', // Red (Raudra/Anger)
    // ... 
  },
];


// src/types/schema.ts

// ... (Existing types)

// The "Filmography" item
export interface MemberCredit {
  id: string;
  role: string; // e.g. "Director", "Actor"
  play: {
    title: string;
    slug: string;
    poster_url: string | null;
    year: string;
  };
}

// The "Timeline" item
export interface MemberTenure {
  role: string;      // "Secretary"
  year: string;      // "2025-26"
  is_current: boolean;
}

// The Full Profile (The Protagonist)
export interface MemberProfile extends EnsembleMember {
  social_links: any; // JSONB
  tenures: MemberTenure[];
  credits: MemberCredit[];
}

// src/types/schema.ts

// 1. EVENT TYPES
// Matches the 'event_type' enum in Supabase
export type EventType = 'workshop' | 'show' | 'meetup' | 'fest' | 'screening' | 'competition';

export interface EventItem {
  id: string;
  created_at?: string;
  title: string;
  slug: string;
  date: string; // ISO Timestamp string
  type: EventType;
  location: string;
  description: string | null;
  featured_image_url: string | null; // The "Negative" image
  registration_link?: string | null; // The "Call Sheet" link
  poster_url?: string | null;
  gallery_urls?: string[] | null;
}

// 2. CHALLENGE TYPES
// Matches the 'challenge_status' enum
export type ChallengeStatus = 'active' | 'voting' | 'closed' | 'archived';

export interface Challenge {
  id: string;
  created_at?: string;
  theme: string;
  slug: string;
  brief: string;
  deadline: string; // ISO Timestamp string
  status: ChallengeStatus;
}

// ... existing types

// 4. THE TRANSMISSION (Submission)
export type SubmissionStatus = 'pending' | 'reviewing' | 'selected' | 'rejected';

export interface Submission {
  id: string;
  created_at: string;
  challenge_id: string;
  // Joins
  challenges?: { theme: string; slug: string };
  
  type: string; // 'monologue', 'script', 'design'
  name: string;
  contact_info: string; // Email or Phone
  content: string; // The text submission or description
  portfolio_link: string | null; // URL to video/drive
  
  status: SubmissionStatus;
}


export type FormType = 'general' | 'audition' | 'writing' | 'design' | 'external';

export interface Challenge {
  id: string;
  theme: string;
  slug: string;
  brief: string;
  deadline: string;
  status: 'active' | 'archived' | 'closed';
  form_type: FormType; // <--- NEW FIELD
  external_link?: string | null; 
}

export interface Submission {
  id: string;
  challenge_id: string;
  data: any; // Stores the dynamic JSON (Name, Age, Links...)
  created_at: string;
  status: 'pending' | 'selected' | 'rejected';
}