using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Entities.Auditing;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class MeetingMinute : AuditedAggregateRootWithUser<Guid, ApplicationUser>
    {
        public MeetingMinute(Guid id) : base(id) { }

        [ForeignKey("Project")]
        public Guid ProjectId { get; set; }
        public required DateTime MeetingDate { get; set; }
        public required string MoMLink { get; set; }
        public required string Comments { get; set; }
        public int Duration { get; set; }

        public override object?[] GetKeys()
        {
            throw new NotImplementedException();
        }
    }
}