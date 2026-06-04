/**
 * Team / people. Empty for now - BTP is founder-led today. The Team section
 * (on /o-nas) auto-hides while this is empty and scales to a grid as people
 * are added, so the brand can grow without a layout rethink.
 */
export type Member = {
  name: string;
  role: string;
  /** optional photo under /public, e.g. "/team/jan.jpg" */
  photo?: string;
};

// TODO: add team members here as the company grows.
export const team: Member[] = [];
