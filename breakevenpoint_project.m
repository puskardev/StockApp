%{
Hector Bahena, Gabriel Molina, Safi Ullah  ENGR 1250_008  04/02/19
Problem statement:  Create a breakeven analysis on the different materials 
and construction methods, and determine the expected return on investment.

Variables:
SA-Surface Area [ft^2]
EC-Weekly Energy Cost [$]
Landfill-Weekly Landfill Cost [$]
MC-Weekly Maintenance Cost [$]
Operate-Weeks Zoo is in Operation [w]
Years-Number of Years in Operation [y]
TLC-Total Landfil Cost [$]
FC-Fixed Cost [$]
Admissions-Pice of Admission per Person [$]
Visitors-Weekly Visitors [person]
Donations-Expected Weekly Donations [$]
years1-Years of Operation [y]
VCW-Weekly Variable Cost [$]
VC-Total yearly Variable Cost [$]
TCY-Total Yearly Cost [$]
TC-Total Cost [$]
RevenueW-Weekly Revenue [$]
RevenueY-Yearly Revenue [$]
TR-Total Revenue [$]
TP-Total Profit [$]
x-Time to Breakeven Point [y]
u-Breakeven Point [$]
TR2-Total Revenue at Half a Year [$]
TC2-Total Cost at Half a Year [$]
TP2-Total Profit at Half a Year [$]
HYDonation-Donation at Six Months to Breakeven [$]
ui-variable
%}

clear 
clc
close all
% input variables given
SA=3000;

% create cell array to hold the type of construction with three different types of materials. 
Data={'Concrete',14,32,93000,900,5,4;'Wood',21,55,110000,800,13,10;'Adobe',17,45,61000,600,5,5};

% create menu for user to choose what kind of material
Materials=menu('Materials',Data{:,1});
b=Data{Materials};

% calculate fixed cost
V=(Data{Materials,2}/12)*SA*Data{Materials,3};
TLC=Data{Materials,5}*Data{Materials,6}*Data{Materials,7};
FC=V+TLC+Data{Materials,4};

% ask user to input information
fprintf('Name: %s\n',b)
EC=input('Energy cost [$/week]: ');
LC=input('Operational Labor cost [$/week]: ');
MC=input('Maintenance cost [$/week]: ');
Landfill=input('Landfill cost [$/week]: ');
Operate=input('Number of weeks per year: ');
Years=input('Number of years for analysis: ');

% ask user to input info for revenue
Admission=input('Admission Price [$/person]: ');
Visitors=input('Number of people: ');
Donations=input('Donations per week [$/week]: ');
years1=[0:Years];

% calculate variable costs
VCW=(EC+LC+Landfill+MC);
VC=VCW*Operate;

% calculate total costs
TCY=VC+FC;
TC=(VC*years1)+FC;

% calculate revenue cost 
RevenueW=((Admission*Visitors)+Donations);
RevenueY=RevenueW*Operate;

% calculating total revenue cost
TR=RevenueY*years1;

% calculate one time donation to break even
TR2=RevenueY*(1/2);
TC2=TCY*(1/2)+FC;
TP2=TR2-TC2;
HYDonation=0-TP2;

% Now calculate total profit
TP=TR-TC;

% calculate breakeven point
x=FC/(RevenueY-VC);
u=RevenueY*x;

% plot graphs
hold on
plot(years1,TR,'b')
hold on
plot(years1,TC,'r')
hold on
plot(x,u,'ok','MarkerSize',12,'MarkerFaceColor','k')
grid on
xlabel('Time [y]','fontsize',14)
ylabel('Money [$]','fontsize',14)
legend('Total Revenue','Total Costs','location','best')
title('Breakeven Analysis','fontsize',21) 
figure()
plot(years1,TP,'g')
grid on
title('Profit','fontsize',21)
xlabel('Time [years]','fontsize',14)
ylabel('Money [$]','fontsize',14)
hold on
plot(x,0,'ok','MarkerSize',12,'MarkerFaceColor','k')
grid on

%s convert the breakeven time to months
breakevenmonths=(x*12);

% make variable to get the index of the vector that holds total profit
ui=Years+1;

% print out the info to user
fprintf('\nMaterial: %s ',b)
fprintf('\n\t\tOperating %0.0f weeks per year will generate per year:\n',Operate)
fprintf('\t\t\t\tRevenue: \t$%0.0f',RevenueY)
fprintf('\n\t\t\t\tCost: \t\t$%0.0f ',VC)
fprintf('\n\t\tThe breakeven time is %0.2f months',breakevenmonths)
fprintf('\n\t\tThe total profit after %0.0f years is $%0.3e.',Years,TP(ui))
fprintf('\n\nIt will take a one-time donation of $%0.2f to breakeven in six months.',HYDonation)


