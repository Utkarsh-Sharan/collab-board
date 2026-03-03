import TeamMember from "./TeamMember";

function TeamDropdown({ members }) {
  return (
    <>
      <article className="absolute left-0 top-10 w-60 border border-gray-200 light-background rounded-lg text-left p-2">
        <h3 className="text-xl font-semibold mb-3">Board Members</h3>

        {members.length &&
          members.map((member) => (
            <TeamMember key={member.userId} member={member} />
          ))}

        <button className="w-full bg-orange-400 rounded-md mt-3 py-1">
          Invite a user
        </button>
      </article>
    </>
  );
}

export default TeamDropdown;
