using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Entities.Auditing;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class Project : AuditedEntity<Guid>
    {
        public required string Name { get; set; }
        public required string Description { get; set; }
        public virtual ICollection<ProjectResource>? Resources { get; set; }
        public virtual ICollection<ClientFeedback>? ClientFeedbacks { get; set; }
        public virtual ICollection<MeetingMinute>? MeetingMinutes { get; set; }
        public virtual ICollection<ProjectUpdate>? ProjectUpdates { get; set; }
        public virtual ICollection<Phase>? Phases
        {
            get; set;
        }
        }
}
