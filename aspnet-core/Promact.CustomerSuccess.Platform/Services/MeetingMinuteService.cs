using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.ObjectMapping;

namespace Promact.CustomerSuccess.Platform.Service
{
    public class MeetingMinuteService : ApplicationService,IMeetingMinuteService
    {
        IRepository<MeetingMinute, Guid> _repository;
        public MeetingMinuteService(IRepository<MeetingMinute, Guid> repository)
        {
            _repository = repository;   
        }

        public async Task<MeetingMinute> CreateAsync(CreateMeetingMinuteDto input)
        {
            var entity = ObjectMapper.Map<CreateMeetingMinuteDto, MeetingMinute>(input);
            await _repository.InsertAsync(entity, autoSave: true);
            return entity;
        }

        public async Task<String> DeleteAsync(Guid id)
        {
            try
            {
                await _repository.DeleteAsync(id, autoSave: true);
                return "Success";
            }
            catch (Exception ex)
            {
                return "Failed" + ex.ToString();
            }

        }

        public async Task<List<MeetingMinute>> GetAllAsync()
        {
            var entities = await _repository.GetListAsync();
            return entities;
        }

        public async Task<MeetingMinute> GetByIdAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);
            return entity;
        }

        public async Task<MeetingMinute> UpdateAsync(Guid id, UpdateMeetingMinuteDto input)
        {
            var entity = await _repository.GetAsync(id);
            ObjectMapper.Map(input, entity);
            await _repository.UpdateAsync(entity, autoSave: true);
            return entity;
        }
    }
}
