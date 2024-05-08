import driver from "../config/Neo4j";

class HasRoleService {

  async addMemberRole(memberEmail: string, role: string): Promise<boolean> {
    const session = driver.session();
    try {
      await session.run(
        `MATCH (m:Member {email: $memberEmail})
            MATCH (r:Role {name: $role})
            MERGE (m)-[:HAS_ROLE]->(r)`,
        {
          memberEmail,
          role,
        },
      );
      return true;
    } catch (error) {
      console.error("Error adding role to member:", error);
      return false;
    }
  }

  async removeMemberRole(memberEmail: string, role: string): Promise<boolean> {
    const session = driver.session();
    try {
      await session.run(
        `MATCH (m:Member {email: $memberEmail})-[hr:HAS_ROLE]->(r:Role {name: $role})
            DELETE hr`,
        {
          memberEmail,
          role,
        },
      );
      return true;
    } catch (error) {
      console.error("Error removing role from member:", error);
      return false;
    }
  }
}

export default HasRoleService;