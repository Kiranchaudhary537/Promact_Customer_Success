using AutoMapper;
using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;

namespace Promact.CustomerSuccess.Platform.ObjectMapping;

public class PlatformAutoMapperProfile : Profile
{
    public PlatformAutoMapperProfile()
    {
        CreateMap<CreateProjectDto, Project>();
        CreateMap<UpdateProjectDto, Project>();
        CreateMap<Project, ProjectDto>().ReverseMap();

        CreateMap<CreateTodoItemDto, TodoItem>();
        CreateMap<UpdateTodoItemDto, TodoItem>();
        CreateMap<TodoItem, TodoItemDto>().ReverseMap();

        CreateMap<ClientFeedback, ClientFeedbackDto>();
        CreateMap<CreateClientFeedbackDto, ClientFeedback>();
        CreateMap<UpdateClientFeedbackDto, ClientFeedback>();

        CreateMap<CreateProjectResourceDto, ProjectResource>();
        CreateMap<UpdateProjectResourceDto, ProjectResource>();
        CreateMap<ProjectResource, ProjectResourceDto>().ReverseMap();

        CreateMap<CreateProjectUpdateDto, ProjectUpdate>();
        CreateMap<UpdateProjectUpdateDto, ProjectUpdate>();
        CreateMap<ProjectUpdate, ProjectUpdateDto>().ReverseMap();

        CreateMap<CreateMeetingMinuteDto, MeetingMinute>();
        CreateMap<UpdateMeetingMinuteDto, MeetingMinute>();
        CreateMap<MeetingMinute, MeetingMinuteDto>().ReverseMap();

        CreateMap<CreateApprovedTeamDto, ApprovedTeam>();
        CreateMap<UpdateApprovedTeamDto, ApprovedTeam>();
        CreateMap<ApprovedTeam, ApprovedTeamDto>().ReverseMap();

        CreateMap<CreatePhaseDto, Phase>();
        CreateMap<UpdatePhaseDto, Phase>();
        CreateMap<Phase, PhaseDto>().ReverseMap();
    }
}
