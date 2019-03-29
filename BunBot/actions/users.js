// Should get all the users in Discord Server
const customSubRoles = [
	process.env.TIER1_SUB_ROLE_ID, // Intern
    process.env.TIER2_SUB_ROLE_ID, // Full Timer
    process.env.TIER3_SUB_ROLE_ID // Senior Dev
];

module.exports = {
    getUsers: (client) => {
        // Get availale guilds
        const guilds = client.guilds.filter(guild => guild.available);

        // Roles for each available guild : // [Map<SnowFlake, GuildMember>]
        const members = guilds.reduce((acc, guild) => [...acc, ...guild.members], []);

         // 
        members.forEach(member => {
            // Check if user has any sub role && does not have Team Member role, remove other role
            filterByRole(member);
        });
    }
}

// Pass in a member and check for custom sub roles each sub must have Team Member role associated
const filterByRole = member => {
    if (!member[1].roles.get(process.env.TWITCH_INTEGRATION_ROLE_ID)) {
			// Check for custom sub roles
			let roles = member[1].roles;

			customSubRoles.forEach(roleId => {
				if (roles.has(roleId)) {
					// We want to remove this role
					console.log(
						`${
							member[1].displayName
						} has ${roleId} but not a team member :(`
					);
					removeRoleForUser(member[1], roleId);
				}
			});
		} else {
			console.log(`${member[1].displayName} has TeamMember Role!`);
		}    
}

const removeRoleForUser = (member, roleId) => {
    console.log(`Starting role removal for user: ${member.displayName}`);
    try {
        member.removeRole(roleId);
        console.log(`${roleId} removed.`);
    } catch (error) {
        console.log(error);
    }
} 
